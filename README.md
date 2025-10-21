# **SmartNode Home Automation**  



<p align="center">
  <img src="https://github.com/user-attachments/assets/d19b8c4c-4ecd-4a22-aeea-10160dbf105c" width="30%" />
  <img src="https://github.com/user-attachments/assets/2853caf2-71ac-4526-b536-c78e6f04062a" width="30%" />
  <img src="https://github.com/user-attachments/assets/45d34e76-cbe0-4cb5-b58f-eccf8c7524aa" width="30%" />
</p>


## **Overview**  
**SmartNode** is a modular **home automation system** that enables users to control and monitor electrical switches remotely through a web application. The system consists of:  
- A **backend** that handles authentication, device management, and communication with IoT nodes.  
- A **frontend** that provides a user-friendly interface for controlling and scheduling smart devices.  
- An **IoT hardware module** that interacts with connected appliances and communicates with the backend via **Wi-Fi and MQTT**.

## **Architecture**  
<img width="913" height="1403" alt="smartnode_architecture" src="https://github.com/user-attachments/assets/17e5b44a-08f5-4bf2-800e-68b8b3cc84b4" />

## **Features**  
✅ Add and manage multiple smart nodes  
✅ Toggle devices **on/off** in real-time  
✅ Secure authentication system  
✅ IoT hardware programmed in **C++ (ESP32/Arduino)**  
<!-- ✅ Set **schedules** for automated control  -->
<!--  ✅ View **analytics** on device usage and status  -->

## ⚠️ Disclaimer  

Yeah, I know, using a monorepo for backend, frontend, and hardware together isn’t the most ideal structure for long-term scalability.  
But since I’m the only one working on this for now, I kept everything in a single repo to make life simple for myself 🌚.  

## **Tech Stack**  

### **Backend**  
- **Node.js** with **Express.js** (API & device management)  
- **MongoDB** (database for users & devices)  
- **MQTT & WebSockets** (real-time communication)  

### **Frontend**  
- **React.js** (modern UI for device control)  
- **Redux** (state management)  
<!--  - **TailwindCSS** (responsive styling)  -->

### **Hardware (IoT Module)**  
- **ESP32/ESP8266 (C++)** (Microcontroller for nodes)  
- **MQTT & REST APIs** (Communication protocol)  
- **Sensors & Relays** (For device control)  

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
