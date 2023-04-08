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
	+ React <sub>18.2.0</sub>
+ Routing
	+ React Router <sub>6.10.0</sub>
+ Styling
	+ React-Bootstrap <sub>2.7.2</sub>
	+ MUI Material <sub>5.11.16</sub>
+ Cookie Management
	+ js-cookie <sub>3.0.1</sub>


##### Back-end 
+ Framework
	+ Express <sub>4.18.2</sub>
+ Database
	+ PostgreSQL <sub>8.10.0</sub>
+ Database/SQL Queries
	+ Knex <sub>2.4.2</sub>
+ Data Mock
	+ FakerJS <sub>7.6.0</sub>
+ Session Management
	+ express-session <sub>1.17.3</sub>

##### Containerization
+ Docker Desktop  <sub>20.10.24</sub>

<sub> Please review the package.json in ./back-end & ./front-end folders for a more detailed list of technology dependencies. </sub>

## Installation

### Quick Start with Docker

<sub> This installation guide assumes the user has the latest version of Docker desktop installed locally. Installation guide can be found [here](https://docs.docker.com/engine/install/). </sub>


1. Clone this repository into your local machine with:       **```git clone git@github.com:emmanuel-londono/Z-Prefix-App.git```**

2. Navigate to the cloned repo in your local machine.

3. Open the cloned repo in vscode.

4. Open the terminal in vscode.

5. Perform the following command in said terminal:   **```docker-compose up```**

	<sub> This should install all dependencies, and perform all boot-up processes.</sub>
	
6. Wait for the front-end to finish loading, this should be the last container to load before opening the app. 

7. Open an instance of Google Chrome or a Chromium browser.

8. Type and search ```http://localhost:3000/``` into the address at the top of the page. 

	<sub> This concludes installation guide.</sub>


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
<sub>Made with Google Slides.</sub>

![Z-Prefix App Login](https://user-images.githubusercontent.com/123216952/230739645-503182fd-3300-40e2-abb3-55bf8828e3bd.png)
![Z-Prefix App Signup](https://user-images.githubusercontent.com/123216952/230739652-a478ea7b-355f-4e16-8e28-225616fc9795.png)
![Z-Prefix App Home](https://user-images.githubusercontent.com/123216952/230739654-9fc1cc1f-e1ed-4667-9e4f-beb19f244bb7.png)
![Z-Prefix App Products](https://user-images.githubusercontent.com/123216952/230739658-5ff47cb2-cfb6-4672-b1ce-46e69dbd2944.png)
![Z-Prefix App Users](https://user-images.githubusercontent.com/123216952/230739662-bd4ed1ca-6926-4f4c-a110-1dcaed3aef8c.png)
![Z-Prefix App Account](https://user-images.githubusercontent.com/123216952/230739666-d0ad3a28-66b3-45ed-9e12-9a401fbdf490.png)

### Entity Relationship Diagram
![ERD](https://user-images.githubusercontent.com/123216952/230739845-8ca047a0-5057-4c63-a1a4-a9f5dd31685c.png)


