
#Imports
import openai
from email.headerregistry import MessageIDHeader
import os
import time
from datetime import datetime
from re import T
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

#Project Plan
"""

User Input - Brief for AI of what im doing - Individual (Person Name) and group mode (To be implemented in future) DONE

Selenium - User login - Saved Cache + Login and cache if not available

Selenium - finds entered user via selectUser function

Selenium - set up message listener, log all sent messages and received - log all msgs to logs folder

Open AI - sends received messages to open ai api alongside user provided brief

"""

#Globals
load_dotenv()

assistantId = os.getenv("AssistantId")
openApiKey = os.getenv("OpenApiKey")

openai.api_key = openApiKey

#Functions

def init():
    global name
    name = input("\n" + "Currently only Individual Mode is supported, please enter user's name below" + "\n\n")

    #global brief
    #brief = input("\n" + "Enter a brief of your current situation for the AI (EG: why you aren't available)" + "\n\n")

    print("\n")

    loggedIn = snapchatLogin()

    while not loggedIn:
        snapchatLogin()
    
    launchBrowser()

    openChat(name)

    chatListener()

    return True

def startLogging():
        dateFormat = datetime.now().strftime('%Y-%m-%d')
        global logs
        logs = open(f"logs/{dateFormat}.txt","a")

def log(state,message):
    dateFormat = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
    logs.write(f"\n\n{dateFormat} - {state} - {message}")

def launchBrowser(headless=True):
    #Selenium Options
    options = Options()
    options.add_argument(f"--user-data-dir=/browser")
    options.add_argument("--start-maximized")
    options.headless = headless
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    global driver
    driver = webdriver.Chrome(options=options)
    return driver

def waitForElement(searchType, elemReference, delay=30):
    WebDriverWait(driver, delay).until(EC.visibility_of_element_located((searchType, elemReference)))

def snapchatLogin():

    launchBrowser()
    driver.get("https://web.snapchat.com")

    time.sleep(3)

    if driver.find_elements(By.CLASS_NAME,"ReactVirtualized__Grid__innerScrollContainer"):
        driver.close()
        return True

    else:
        driver.close()
        launchBrowser(False)
        driver.get("https://web.snapchat.com")
        waitForElement(By.CLASS_NAME,"ReactVirtualized__Grid__innerScrollContainer",600)
        driver.close()
        return True

    return False

def openChat(name):
    driver.get("https://web.snapchat.com")

    waitForElement(By.XPATH, ".//span[contains(@class, 'FiLwP')]//span[contains(@class, 'nonIntl')]")

    grid = driver.find_elements(By.CLASS_NAME,"ReactVirtualized__Grid__innerScrollContainer")[0]

    peopleItems = grid.find_elements(By.XPATH, "//div[@role='listitem']")
    people = []

    for person in peopleItems:

        itemName = person.find_elements(By.XPATH, ".//span[contains(@class, 'FiLwP')]//span[contains(@class, 'nonIntl')]")
        
        #If list item is a person
        if itemName:
            itemName = itemName[0].text
        
        #Else item is a group
        else:
            itemName = person.find_elements(By.XPATH, ".//span[contains(@class, 'mYSR9')]//span[contains(@class, 'FiLwP')]")[0].text
        
        if itemName == name:
            person.click()
            return True

    return False

def getAllMsgs():
    time.sleep(1)

    toDelete = []
    messages = []
    messageItems = driver.find_elements(By.XPATH,"(//ul[contains(@class, 'MibAa')]//li[contains(@class, 'T1yt2')][(.//div[contains(@class, 'GUB_w')]//span[contains(@class, 'nonIntl')]) or (.//div[contains(@class, 'p8r1z')]//span[contains(@class, 'nonIntl')])])")

    for message in messageItems:
        messageHeader = message.find_element(By.XPATH,".//div[contains(@class, 'GUB_w')]//span[contains(@class, 'nonIntl')]").text
        messageContent = message.find_element(By.XPATH,".//div[contains(@class, 'p8r1z')]//span[contains(@class, 'nonIntl')]").text
            
        if messageHeader != "ME":
            messages.append(messageContent)
        else:
            toDelete.append(message)

    totalIndex = len(messageItems)

    for item in toDelete:
        messageItems.remove(item)

    return messages,messageItems,totalIndex

def chatListener():
    messages,messageItems,totalIndex = getAllMsgs()
    index = len(messages)
    totalIndex += 1

    initThread()

    while True:
        waitForElement(By.XPATH,f"(//ul[contains(@class, 'MibAa')]//li[contains(@class, 'T1yt2')][(.//div[contains(@class, 'GUB_w')]//span[contains(@class, 'nonIntl')]) or (.//div[contains(@class, 'p8r1z')]//span[contains(@class, 'nonIntl')])])[{totalIndex}]",3600)
        
        time.sleep(5)

        messages,messageItems,totalIndex = getAllMsgs()
        
        i = 0
        x = -2
        y = len(messages) - (index + 1)

        message = messages[index]
        while i < y:
            message = message + f"; {messages[x]}"

            x-=1
            i+=1

        index = len(messages)

        response = postMsgToAI(message)

        sendMessage(response)

def initThread():

    global thread
    thread = openai.beta.threads.create()
    """
    #Create System Brief Message
    openai.beta.threads.messages.create(
        thread_id=thread.id,
        role="system",
        content=brief
    )
    """
    return True

def postMsgToAI(message,role="user"):

    #Send Message to Thread
    message = openai.beta.threads.messages.create(
        thread_id=thread.id,
        role=role,
        content=message
    )

    # Run the assistant on the thread
    run = openai.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistantId
    )

    #Wait for AI Response
    while True:
        run_status = openai.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )
        print(f"Run Status: {run_status.status}")

        if run_status.status == "completed":
            break  # Exit loop once completed

        time.sleep(2)  # Wait before checking again

    # Retrieve the assistant's message
    messages = openai.beta.threads.messages.list(thread_id=thread.id)

    #Gets last message in Thread
    for msg in messages.data:
        if msg.role == "assistant":
            response = msg.content[0].text.value
            break

    return response

def sendMessage(message):
    inputBox = driver.find_element(By.XPATH,"//div[@role='textbox'and @placeholder='Send chat']")
    inputBox.click()

    inputBox.send_keys(message)
    inputBox.send_keys(Keys.RETURN)

    return True

init()
logs.close()