import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key kaha hai bhai")

client=Groq(api_key=my_api_key)
model="llama-3.3-70b-versatile"
role="user"

#structured output
from pydantic import BaseModel

class Ticket(BaseModel):
    name: str
    address: str
    email: str
    issue: str

schema=Ticket.model_json_schema()

response_format={
    "type" : "json_object"
}
system_prompt=f"""
Extract the personal information and issue details from the customer ticket. The output should be in JSON format and should follow the schema provided below.
{schema}
"""
message_system={
    
    "role": "system",
    "content": system_prompt
}

text="hello my name is virat kohli. i have an iphone which is not working at all. my address is delhi. my email is abc@gmail.com. my contact number is 82555"
prompt=f"""
This is a customer ticket. Please extract the personal information and issue details from this.
{text}
"""
message={
    "role": role,
    "content": prompt
}
messages=[message_system, message]

response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
answer=response.choices[0].message.content
print(answer)


#isko padhte kaise hai 
import json
raw_json=answer
data_file=json.loads(raw_json)
ticket=Ticket(**data_file)
print(ticket.name)
print(ticket.email)
print(ticket.issue)
print(ticket.address)