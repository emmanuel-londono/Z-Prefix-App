# Z-Prefix-App


## Table of Contents

- [Description]
- [Installation]
- [Usage]
- [Removal]
- [Extraneous]



## Description

This is my submission for the SDI 15 Cohort Z-Prefix-App.

#### Technologies Used
##### Front-end 
+ Framework
	+ React
+ Routing
	+ React Router
+ Styling
	+ React-Bootstrap
	+ React-MUI
+ Cookie Management
	+ js-cookie


##### Back-end 
+ Framework
	+ Express
+ Database
	+ PostgreSQL
+ Database/SQL Queries
	+ Knex
+ Data Mock
	+ FakerJS
+ Session Management
	+ express-session

##### Containerization
+ Docker


## Installation

### Quick Start with Docker


1. Clone this repository into your local machine with:       **```git clone git@github.com:emmanuel-londono/Z-Prefix-App.git```**

2. Navigate to the cloned repo in your local machine.

3. Open the cloned repo in vscode.

4. Open the terminal in vscode.

5. Perform the following command in said terminal:   **```docker-compose up```**

<sub> This should install all dependencies, and perform all boot-up processes.</sub>
	
6. Wait for the front-end to finish loading, this should be the last container to load before opening the app. 


## Usage

There is an admin profile built into the mocked back-end data. To log in as an inventory manager, use the following credentials in the login screen: 


      USERNAME:
               admin
               
      PASSWORD:
               123
	              
<sub>It is also possible to sign-up for new login credentials. </sub>


## Removal

Run the following command to remove the docker image and container built for this program: **```docker-compose down --rmi all```**


## Extraneous

### Conceptual Wire Frame

![Z-Prefix App Login](https://user-images.githubusercontent.com/123216952/230739645-503182fd-3300-40e2-abb3-55bf8828e3bd.png)
![Z-Prefix App Signup](https://user-images.githubusercontent.com/123216952/230739652-a478ea7b-355f-4e16-8e28-225616fc9795.png)
![Z-Prefix App Home](https://user-images.githubusercontent.com/123216952/230739654-9fc1cc1f-e1ed-4667-9e4f-beb19f244bb7.png)
![Z-Prefix App Products](https://user-images.githubusercontent.com/123216952/230739658-5ff47cb2-cfb6-4672-b1ce-46e69dbd2944.png)
![Z-Prefix App Users](https://user-images.githubusercontent.com/123216952/230739662-bd4ed1ca-6926-4f4c-a110-1dcaed3aef8c.png)
![Z-Prefix App Account](https://user-images.githubusercontent.com/123216952/230739666-d0ad3a28-66b3-45ed-9e12-9a401fbdf490.png)

### Entity Relationship Diagram
![ERD](https://user-images.githubusercontent.com/123216952/230739845-8ca047a0-5057-4c63-a1a4-a9f5dd31685c.png)


