import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from tqdm.notebook import tqdm
import math
from pymongo import MongoClient
import os, sys

# ------------------------------
# id(email) and pw for careerly
careerly_id = ''
careerly_pw = ''
# num of post to crawl
num_of_post = 10
# -------------------------------

client = MongoClient("mongodb://localhost:27017/careerly", 27017)
db = client.clonecodecareerly


# open up website
cwd = os.getcwd()
driver = webdriver.Chrome('{a}/chromedriver'.format(a=cwd))
driver.get('https://careerly.co.kr/login');


# login

email_xpath = '/html/body/div[1]/div[2]/div/div/form/div[1]/input'
password_xpath = '/html/body/div[1]/div[2]/div/div/form/div[2]/input'
email = driver.find_element_by_xpath(email_xpath)
password = driver.find_element_by_xpath(password_xpath)

email.send_keys(careerly_id)
password.send_keys(careerly_pw)

driver.find_element_by_xpath('/html/body/div[1]/div[2]/div/div/form/div[3]/button').click()


# scroll down
# repeat as needed
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
time.sleep(1)


result = []

# show full text
for i in range(num_of_post):
    try:
        driver.find_element_by_xpath('/html/body/div[1]/div[2]/div/div/div/div/div[{a}]/div[1]/div/p/span/span'.format(a=i+1)).click()
    except:
        pass

# crawl
for i in tqdm(range(num_of_post)):
    one_post = {}
    name_xpath = '/html/body/div[1]/div[2]/div/div/div/div/div[{a}]/a[1]/div[2]/p[1]/span'.format(a=i+1)
    role_xpath = '/html/body/div[1]/div[2]/div/div/div/div/div[{a}]/a[1]/div[2]/p[1]'.format(a=i+1)
    userImg_xpath = '/html/body/div[1]/div[2]/div/div/div/div/div[{a}]/a[1]/div[1]/img'.format(a=i+1)
    content_xpath = '/html/body/div[1]/div[2]/div/div/div/div/div[{a}]/div[1]/div/p'.format(a=i+1)
    url_xpath = ''
    try:
        url_xpath = '/html/body/div[1]/div[2]/div/div/div/div/div[{a}]/div[2]/a'.format(a=i+1)
    except:
        pass
    name = driver.find_element_by_xpath(name_xpath).text
    role = driver.find_element_by_xpath(role_xpath).text
    role = role.replace(name, "")

    userImg = driver.find_element_by_xpath(userImg_xpath).get_attribute("src")
    content = driver.find_element_by_xpath(content_xpath).text
    try:
        url = driver.find_element_by_xpath(url_xpath).get_attribute("href")
    except:
        pass
    
    one_post["name"] = name
    one_post["role"] = role
    one_post["userImg"] = userImg
    one_post["content"] = content
    try:
        one_post["url"] = url
    except:
        pass
    result.append(one_post)


# for i in range(num_of_post):
#     doc = result[i]
#     db.posts.insert_one(doc)

# db.getCollection('posts').find({}).toArray()


print(result)