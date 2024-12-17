# streamlit run chatbot.py
# http://localhost:8501
# ~/.streamlit/config.toml
import streamlit as st
from langchain.llms import Ollama

# Initialize Ollama
ollama = Ollama(model="mistral")

# Streamlit app
st.title("Chatbot")
user_input = st.text_input("You:", "")
if user_input:
    response = ollama(user_input)
    st.write(f"Bot: {response}")
