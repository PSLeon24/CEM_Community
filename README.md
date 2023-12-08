# Computer Engineering Major Community Homepage.

## Introduction to Our Team
|Selfie|Name|Duty|Grade|Major|
|:--:|:--:|:--:|:--:|:--:|
|<img height="180" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/1c4a75a2-fa44-4bde-ba6f-1b9b6868de0b">|Yeong-Min Ko|Director & DBA<br>Full-Stack Developer|3|Computer Egineering|
|<img height="180" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/86cca87e-09b1-40af-b82a-e63509253dd7">|Hyun-Soo Choi|ER-Diagram<br>Full-Stack Developer|3|Computer Egineering|
|<img height="180" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/b5e13f86-dbd8-4b1a-8395-fad3cd06ed0f">|Han-Gyul Choi|UI/UX<br>Back-End Developer|3|Computer Egineering|

## 💻 Tech Stack
<div>
  <h3>Front-End & Back-End<h3>
    <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white">
</div>

## 1. Requirements Analysis
- ### 1_1. Objective Setting
  - Our goal is activating communication between same major's students through our project.
- ### 1_2. Schedule Setting
  <pre>
  Date     Status    Goal
  ~ 10/17     O      Project planning, idea discussion, selection of stack to use - All member
  ~ 10/24     O      Extract main scope
  ~ 10/31     O      Collect resources related the project and Write a Usecase Diagram & UI/UX
  ~ 11/07     O      System Design(Architecture Design and Detail Design) & Develop Front-end
  ~ 11/14     O      Database Design(by 2_3_2. E-R Diagram) and Prepare the mid-term presentation
  ~ 11/23     O      Mid-term presentation / Physical Design using SQL Server
  ~ 11/28     O      Develop Back-end / Front-end maintenance / System testing
  ~ 12/05     O      Develop Back-end / Front-end maintenance / System testing
  ~ 12/12     -      View, Indexing, Regularizaiton & Final check and Prepare Final-term presentation
  ~ 12/19     -      Final-term presentation / Finish the project
  </pre>

## 2. Design
- ### 2_1. System Design
  - #### 2_1_1. Usecase Diagram
    <img height="300" src="https://github.com/PSLeon24/CEM_Community/assets/102220333/1c09d3da-a716-4a45-a740-fd7df1d646bb"><br>
    - <a href="https://cool-mantis-03f.notion.site/Requirements-Analysis-d2eb768d403841d89a4ab4a276dc068d?pvs=4">Read More</a>
  - #### 2_1_2. Detail Design
    - Decide categories and components: <a href="https://cool-mantis-03f.notion.site/2023-10-31-6e9e8a2b51564c0e83214eb277a21658?pvs=4">Read More</a>
- ### 2_2. UI/UX Design
  - 2023/11/07: UI design: <a href="https://uncovered-corn-690.notion.site/9ef98f2f12114555ad16b62896fdf508?pvs=4">Read More</a>
- ### 2_3. Database Design
  - #### 2_3_1. Conceptual Design
    - ##### Extract entities, attributes and relationship
      <img width="500" alt="스크린샷 2023-11-21 오전 10 07 29" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/72451589-df53-478b-ab36-425640f21a48">
  - #### 2_3_2. Logical Design
    - ##### E-R Diagram
      <img width="500" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/cf95bdce-9f9c-4ba3-8346-8798c51c9d40">
    - ##### Schema Design
      <img width="500" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/620b78b7-e3a1-4080-90b5-63ea0fe8dab6">
  - #### 2_3_3. Physical Design using SQL Server
    - <a href="https://cool-mantis-03f.notion.site/11-19-db7277d68b3946b7a1f4d23f4e4266a5?pvs=4">Read More</a>
## 3. Implementation
<img width="1440" alt="스크린샷 2023-11-26 오후 10 23 42" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/9edb3c3d-4c51-4f83-9afe-0e53d348e9ed">

- Create Database and Tables
- Develop Sign Up, Login
- Develop Board List and Write Board
- Develop Read Board
- Develop Popular Board
- Develop Comments
- Develop Board Like
- Develop Modify Board
- Develop Delete Board
- Develop Academic Schedule
- Testing

## 4. Testing
- <a href="https://youtu.be/3TyP5igcTAU">Black Box Test</a>
  - When reading a post, I found an issue where all comments in the bulletin board group were read.
  Test Case

  |TC id|Precondition|Expected Result|Pass/Fail|Remark|
  |--|--|--|--|--|
  |1|Sign up|good operation|Pass|-|
  |2|Login (junior: 3grade)|good operation|Pass|-|
  |3|Enter the junior board|good operation|Pass|-|
  |4|Write a post on the lab introduction board|good operation|Pass|-|
  |5|Click Like Button on what I wrote|good operation|Pass|-|
  |6|Go to the lab introduction board|good operation|Pass|-|
  |7|Write a post on the lab introduction board|good operation|Pass|-|
  |8|Write a comment on what I wrote|good operation|Fail|-|
  |9|Edit a post I wrote in introduction board post|good operation|Pass|-|
  |10|View my page|good operation|Pass|-|
  |11|Log out|good operation|Pass|-|
  |12|Enter the freshman board with non-member status|good operation|Pass|-|
  |13|Try writing a post with non-member status|does not work|Pass|-|
  |14|Try writing a comment with mon-member status|does not work|Pass|-|
  |15|Click ‘Like’ Button|good operation with non-member status|Pass|-|
  
## 5. Maintanance
1. Error resolution (post comments), Query Refactoring(Popular Board)

## Meeting records
- 2023/10/13: We have decided a project subject to develop a community homepage about our major. Because There is little communication although they are same major at our college.
- 2023/10/31: We have wrote usecase diagram after we collect requirements, extracted components and decided categories.
- 2023/11/07: We shared our UI/UX feedback and drew a ER-Diagram. We plan to implement the frontend based on the UI design document.
- 2023/11/19: We developed back-end using express. And We designed database schema again. implement progress: 60% - <a href="https://cool-mantis-03f.notion.site/11-19-db7277d68b3946b7a1f4d23f4e4266a5?pvs=4">Read More</a>
- 2023/11/25: We developed back-end section(read board, comments in a board, likes in a board).
- 2023/11/26: We developed back-end section(modify board, delete board). implement progress: 90% - <a href="https://cool-mantis-03f.notion.site/11-19-db7277d68b3946b7a1f4d23f4e4266a5?pvs=4">Read More</a>
- 2023/12/05: We finished this project's development.

## Work records for each members
#### Yeong-Min Ko
- 2023/10/29: Develop a prototype page with Node.js

|Main|Login|Sign up|
|:--:|:--:|:--:|
|<img width="1440" alt="스크린샷 2023-10-29 오전 1 33 23" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/7ae07c2d-b352-4b02-8ac5-d114919730d4">|<img width="1439" alt="스크린샷 2023-10-29 오전 1 33 30" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/c9e57801-f764-4fd6-8c1a-d858244c1a37">|<img width="1438" alt="스크린샷 2023-10-29 오전 1 35 20" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/e39ffbf0-07d3-4867-83c4-32aab3b5a837">|

- 2023/11/07: Database Design(Extract entities, attributes and relationship) and Draw a ER-Diagram with Hyun-Soo Choi / Make Midterm PPT
- 2023/11/12: Manage routers between pages.
- 2023/11/19: Develop Back-End (main, sign up, login)
- 2023/11/23: Develop Back-End (board list, board write, add encryption at sign up)
  - When signing up for membership, SHA-512 encryption is applied to the information stored in plain text using the crypto module.
- 2023/11/25: Develop Front-End & Back-End (read board, like and comment in board, popular board in main page, modify board)
- 2023/11/26: Develop delete board
- 2023/11/28: Develop academic schedule
- 2023/12/06: Testing Our Project with black box methods.
- 2023/12/08: Error resolution (post comments), Query Refactoring(Popular Board)

#### Hyun-Soo Choi
- 2023/10/31: Create a Usecase Diagram
- 2023/11/07: Write database application field and Draw a ER-Diagram using diagrams.net
- 2023/11/12: Develop Front-End & Re-Design ER-Diagram

|Main|Sign in|Sign up|
|:--:|:--:|:--:|
|<img width="1437" alt="스크린샷 2023-11-14 오전 8 55 47" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/9560884e-2916-4c8a-afc6-a271cc762031">|<img width="1439" alt="스크린샷 2023-11-14 오후 3 55 30" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/c214d56c-7bc8-4759-a5e8-bce222ee4d83">|<img width="1440" alt="스크린샷 2023-11-14 오후 3 57 45" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/52ca4d57-8de8-4208-aecc-bc00beeb60db">|
|<b>Board</b>|<b>Write</b>|<b>Modify</b>|
|<img width="1439" alt="스크린샷 2023-11-14 오전 8 56 43" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/99b4eeeb-77aa-4b33-83d0-b012f3f8de2c">|<img width="1436" alt="스크린샷 2023-11-14 오전 8 56 58" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/11939177-aca6-40be-be7c-31e7da22cb9e">|<img width="1440" alt="스크린샷 2023-11-14 오후 3 55 47" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/fa151efa-79e6-426f-8d80-72765076fe6b">|
- 2023/11/19: Develop Back-End (in progress: read board, comment)
- 2023/11/21: Develop Front-End(comment in a read page), Develop Back-End (in progress: read board, comment)
- 2023/11/25: Develop Front-End(academic calendar)

#### Han-Gyul Choi
- 2023/10/31: Conduct a survey to collect user needs: <a href="https://docs.google.com/forms/d/1GR1TKiiJjvH85kxkTO_HOnUt6hKx6fm_2CuDDYCK8dY">Survey link</a>

|Idx|Question|
|:--:|:--:|
|1|본인이 속한 학과를 선택해주세요.|
|2|학과 생활에 대한 전반적인 만족도는?|
|2-1|학과 생활에 대한 불만이 있다면 어떤 점인가?|
|2-2|학과 생활에 전반적으로 만족한다면 그 이유는?|

- 2023/10/31: Essential features and features to consider: <a href="https://support.daouoffice.com:8443/cloud_help#communities"> web site link</a>
- 2023/10/31: Coummnity demo: <a href="https://kanari1569.tistory.com/35"> 1</a>
<a href="https://kanari1569.tistory.com/36"> 2</a>
<a href="https://kanari1569.tistory.com/37"> 3</a>
<a href="https://kanari1569.tistory.com/38"> 4</a>
<a href="https://kanari1569.tistory.com/39"> 5</a>
<a href="https://kanari1569.tistory.com/40"> 6</a>
- UI Design & Back-end <a href="https://uncovered-corn-690.notion.site/9ef98f2f12114555ad16b62896fdf508?pvs=4">Notion Link</a>
- 2023/11/07: Draw UI design
- 2023/11/14: Update UI icon & Back-end status in Notion
- 2023/11/16: Update Back-end Code
- 2023/11/19: Develop Back-End (in progress: read board, comment)
- 2023/11/25: Develop Back-End (finished: read board, comment), modify board
- 2023/11/26: Develop delete board

---
#### References
1) Bootstrap v5.3, docs, https://getbootstrap.kr/docs/5.3/getting-started/introduction/
2) To be added.
3) To be added.

---
<p align="center">
<img height="200" src="https://github.com/PSLeon24/CEM_Community/assets/59058869/b612dd9b-e2d9-4887-afe0-dde9406a011b">
</p>
