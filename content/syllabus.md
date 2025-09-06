---
title: Applied Reverse Engineering (HACS408E)
toc: false
sidebar:
  exclude: true
type: default
---

> See [syllabus_2025.pdf](/syllabus_2025.pdf) for a PDF copy of the following
> syllabus.

**Term:** Fall 2025\
**Instructors:** Chase Kanipe, Luke Mains\
**Pronouns:** he/him, he/him\
**Email:** [ckanipe@umd.edu](mailto:ckanipe@umd.edu),
[lmains@umd.edu](mailto:lmains@umd.edu)\
**Office Hours:**

- Chase: TBD, on [Discord](https://discord.com/channels/)
- Luke: Fridays 5:00-6:30 PM, PHY-4311B

**Credits:** 3\
**Course Dates:** Sep 03, 2025 \- Dec 17, 2025\
**Course Times:** Wednesday 5:00 pm \- 7:45 pm\
**Classroom:** PHY 4311B

## **Course Description**

This course will introduce students to the tools and techniques required to
analyze the security properties of various systems. Topics covered will include
assembly language, executable file formats, operating system internals, and the
static/dynamic analysis of compiled binaries. Students will apply these concepts
to real-world scenarios like malware analysis and vulnerability analysis with
interactive labs, at-home assignments, and a final project.

## **Learning Outcomes**

After successfully completing this course you will be able to:

- **Use a variety of popular reverse engineering tools**, including:
  - Binary Ninja
  - Debuggers (GNU Debugger, Windbg)
  - Wireshark
  - Shell scripting and command line utilities
- **Understand binary file formats how to approach unknown binary data**
  - Triage, extract and analyze unknown binary files
  - Executable file formats such as ELF and PE
- **Operating systems concepts**
  - Windows and Linux operating system APIs
  - Reversing programs written for both Windows and Linux
- **Reverse engineer a variety of binary executables**, including:
  - Programs written in a variety of languages (C, C++, Java, Go)
  - Malicious programs (including how to handle anti reversing techniques)
- **Understand and interpret network packets**
  - Passively sniff and record local network traffic
  - View the structure of packets for standard protocols such as TCP, UDP,
    HTTP(S), QUIC, etc.
  - Analyze web traffic to find indicators of malicious activity
- **Present reverse engineering projects to a technical audience**
- **Understand how attackers gain access to computer systems**
  - Exploit buffer overflow vulnerabilities in computer programs
  - Understand standard mitigations such as stack canaries and ASLR
- **Learn to apply reversing techniques to other problem domains**
  - Embedded devices and firmware analysis
  - Reverse engineer android applications
  - Understand the challenges associated with modern languages such as Go or
    Rust
- **Document and organize artifacts recovered from reverse engineering into a
  technical report.**

## **Required Resources**

- Course Website: [https://hacs408e.umd.edu](http://hacs408e.umd.edu)

- All software used in this class will be free and/or open source. Students will
  be provided a Windows and Linux VM hosted on ACES infrastructure which will be
  accessed remotely.. Alternatively, students can run their own virtual machine
  using VMWare or Virtualbox or another hypervisor. The following software will
  be used in this class:

  - Standard Windows / Linux Command line Tools

  - Binary Ninja

  - Gnu Debugger / Windbg

  - Wireshark

## **Course Structure**

Since this is an applied course, it will be very focused on labs modeled after
real-world reverse engineering tasks. Students are expected to attend class and
attempt the labs, which are used to introduce the skills necessary to complete
the homeworks. The in-person nature of this class will push you to take an
active role in the learning process. You will do this by engaging and
collaborating with other students and the instructor on a regular basis both, in
live sessions, as well as through group work and activities.

## **Tips for Success in this Course**

1. **Participate.** I invite you to engage deeply, ask questions, and talk about
   the course content with your classmates. You can learn a great deal from
   discussing ideas and perspectives with your peers and professor.
   Participation can also help you articulate your thoughts and develop critical
   thinking skills.
2. **Manage your time.** Students are often very busy, and I understand that you
   have obligations outside of this class. However, students do best when they
   plan adequate time that is devoted to course work. Block your schedule and
   set aside plenty of time to complete assignments including extra time to
   handle any technology related problems.
3. **Login regularly.** I recommend that you log in to ELMS-Canvas several times
   a week to view announcements, discussion posts and replies to your posts. You
   may need to log in multiple times a day when group submissions are due.
4. **Do not fall behind.** This class moves at a quick pace and each week builds
   on the previous content. If you feel you are starting to fall behind, check
   in with the instructor as soon as possible so we can troubleshoot together.
   It will be hard to keep up with the course content if you fall behind in the
   pre-work or post-work.
5. **Use ELMS-Canvas notification settings.** Pro tip\! Canvas ELMS-Canvas can
   ensure you receive timely notifications in your email or via text. Be sure to
   enable announcements to be sent instantly or daily.
6. **Ask for help if needed.** If you need help with ELMS-Canvas or other
   technology, IT Support. If you are struggling with a course concept, reach
   out to the instructors and your classmates for support.

## **Policies and Resources for Undergraduate Courses**

It is our shared responsibility to know and abide by the University of
Maryland’s policies that relate to all courses, which include topics like:

- Academic integrity
- Student and instructor conduct
- Accessibility and accommodations
- Attendance and excused absences
- Grades and appeals
- Copyright and intellectual property

Please visit
[www.ugst.umd.edu/courserelatedpolicies.html](http://www.ugst.umd.edu/courserelatedpolicies.html)
for the Office of Undergraduate Studies’ full list of campus-wide policies and
follow up with me if you have questions.

## **Course Guidelines**

### 

### **Names/Pronouns and Self-Identifications:**

The University of Maryland recognizes the importance of a diverse student body,
and we are committed to fostering inclusive and equitable classroom
environments. I invite you, if you wish, to tell us how you want to be referred
to in this class, both in terms of your name and your pronouns (he/him, she/her,
they/them, etc.). Keep in mind that the pronouns someone uses are not
necessarily indicative of their gender identity. Visit
[trans.umd.edu](http://trans.umd.edu/) to learn more.

Additionally, it is your choice whether to disclose how you identify in terms of
your gender, race, class, sexuality, religion, and dis/ability, among all
aspects of your identity (e.g., should it come up in classroom conversation
about our experiences and perspectives) and should be self-identified, not
presumed or imposed. I will do my best to address and refer to all students
accordingly, and I ask you to do the same for all of your fellow Terps.

### 

### **Communication with Instructor:**

If you need to reach out to the instructors, please email us at
[ckanipe@umd.edu](mailto:ckanipe@umd.edu), and
[lmains@umd.edu](mailto:lmains@umd.edu). Please DO NOT email us with questions
that are easily found in the syllabus or on ELMS (i.e. When is this assignment
due? How much is it worth? etc.) but please DO reach out about personal,
academic, and intellectual concerns/questions. While we will do our best to
respond to emails within 24 hours, you will more likely receive email responses
from us after 5:00 pm EST, weekdays or the next day.

ELMS: We will send IMPORTANT announcements via ELMS messaging. You must make
sure that your email & announcement notifications (including changes in
assignments and/or due dates) are enabled in ELMS so you do not miss any
messages. You are responsible for checking your email and Canvas/ELMS inbox with
regular frequency.

### 

### **Communication with Peers:**

You will be given access to the class discord server through ELMS. This is meant
to be a space for you to connect with your peers, ask questions, and plan for
your midterm presentation. With a diversity of perspectives and experience, we
may find ourselves in disagreement and/or debate with one another. As such, it
is important that we agree to conduct ourselves in a professional manner and
that we work together to foster and preserve a virtual classroom environment in
which we can respectfully discuss and deliberate controversial questions. I
encourage you to confidently exercise your right to free speech—bearing in mind,
of course, that you will be expected to craft and defend arguments that support
your position. Keep in mind, that free speech has its limit and this course is
NOT the space for hate speech, harassment, and derogatory language. I will make
every reasonable attempt to create an atmosphere in which each student feels
comfortable voicing their argument without fear of being personally attacked,
mocked, demeaned, or devalued.

Any behavior (including harassment, sexual harassment, and racially and/or
culturally derogatory language) that threatens this atmosphere will not be
tolerated. Please alert me immediately if you feel threatened, dismissed, or
silenced at any point during our semester together and/or if your engagement in
discussion has been in some way hindered by the learning environment.

## **Major Assignments**

### **Homework Assignments**

- There will be a homework assignment associated with almost every topic covered
  in class. Assignments will be grouped together and due approximately every two
  weeks. Please see the schedule below (and on the class webpage) for exact due
  dates. Every assignment will require understanding the tools and techniques
  described in the associated week's lecture. Students must complete a write-up
  of their results, explaining their analysis methods and possibly answering
  some questions. You must submit a pdf copy of the report to ELMS with working
  images.
- There will be **10 Homework Assignments** out of the 14 weeks of actual
  lectures. Each homework will be announced and can be found in the
  corresponding week tab of the class website, or in ELMS.

### **Quizzes**

- There will be 3 small quizzes spread throughout the semester. Each quiz will
  be announced the week before and will take place during the first 15-30
  minutes of class a week from the announcement.
- Quizzes may include questions from all course content covered, not just the
  information since the last quiz. However these will likely be biased towards
  more recent lectures.

### **Participation & Engagement**

- During live sessions, students will work on multiple labs and are expected to
  submit documents with their answers to the questions for each lab at the end
  of class. If you miss class, you can still complete the labs and submit them
  after. Please let both of the instructors know if you will not be able to make
  it to class.
- Labs are graded but not harshly. As long as you try to answer the questions as
  best you can, you’ll get full points.

### **Team Presentation**

- At the midpoint of the semester, students will be split into groups of 4 and
  given a password protected zip file containing a live malware sample to
  analyze. DO NOT run this program on your personal laptop. Each group will
  present two weeks from the announcement with an analysis of the software. The
  goal is not necessarily to gain a complete understanding of the malware in two
  weeks, but to conduct open source research, demonstrate reverse engineering
  techniques learned in class, and present your findings to a technical audience
  of your peers.

### **Final Project**

- In lieu of a final exam students will be given a final project to complete.
  Previously this has been a challenging executable to reverse engineer but it
  may not be the same year to year. A final report will be due by 11:59 pm the
  Sunday before finals week.

## **Grading Structure**

| Assignment                        | Percentage % (Distributed evenly across assignments) |
| :-------------------------------- | :--------------------------------------------------- |
| **Homework**                      | **40%**                                              |
| **In-class Participation (Labs)** | **10%**                                              |
| **Quizzes**                       | **10%**                                              |
| **Team Presentation**             | **20%**                                              |
| **Final Project**                 | **20%**                                              |
| **Total**                         | **100%**                                             |

## 

## **Academic Integrity**

For this course, some of your assignments will be collected via Turnitin on our
course ELMS page. I have chosen to use this tool because it can help you improve
your scholarly writing and help me verify the integrity of student work. For
information about Turnitin, how it works, and the feedback reports you may have
access to, visit
[Turnitin Originality Checker for Students](https://umd.service-now.com/itsc?id=kb_article&sys_id=c0116d8f0f7ef2007f232ca8b1050e63)

The University's Code of Academic Integrity is designed to ensure that the
principles of academic honesty and integrity are upheld. In accordance with this
code, the University of Maryland does not tolerate academic dishonesty. Please
ensure that you fully understand this code and its implications because all acts
of academic dishonesty will be dealt with in accordance with the provisions of
this code. All students are expected to adhere to this Code. It is your
responsibility to read it and know what it says, so you can start your
professional life on the right path. **As future professionals, your commitment
to high ethical standards and honesty begins with your time at the University of
Maryland.**

It is important to note that course assistance websites, such as CourseHero, or
AI-generated content are not permitted sources unless the instructor explicitly
gives permission. Material taken or copied from these sites can be deemed
unauthorized material and a violation of academic integrity. These sites offer
information that might be inaccurate or biased and most importantly, relying on
restricted sources will hamper your learning process, particularly the critical
thinking steps necessary for college-level assignments.

Additionally, students may naturally choose to use online forums for course-wide
discussions (e.g., Group lists or chats) to discuss concepts in the course.
However, collaboration on graded assignments is strictly prohibited unless
otherwise stated. Examples of prohibited collaboration include: asking
classmates for answers on quizzes or exams, asking for access codes to clicker
polls, etc. Please visit the
[**Office of Undergraduate Studies’ full list of campus-wide policies**](http://www.ugst.umd.edu/courserelatedpolicies.html)
and reach out if you have questions.

|                      | ![][image1] | ![][image2] | ![][image3] | ![][image4] | ![][image5] | ![][image6] |
| :------------------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| In-Class Labs        | ✔           | ✔           | ✔           | ✔           | ✔           | ✔           |
| Homework Assignments | ✔           | ✔           | ✔           | ✔           | \---        | \---        |
| Quizzes              | ✔           | ✔           | ✔           | \---        | \---        | \---        |
| Team Project         | ✔           | ✔           | ✔           | ✔           | ✔           | ✔           |

## **Grades**

All assessment scores will be posted on the course ELMS page. If you would like
to review any of your grades (including the final project), or have questions
about how something was scored, please email the instructors to schedule a time
for us to meet and discuss. We are happy to discuss any of your grades with you,
and if we have made a mistake we will immediately correct it. Any formal grade
disputes must be submitted in writing and within one week of receiving the
grade.

Final letter grades are assigned based on the percentage of total assessment
points earned. To be fair to everyone I have to establish clear standards and
apply them consistently, so please understand that being close to a cutoff is
not the same as making the cut (89.99 ≠ 90.00). It would be unethical to make
exceptions for some and not others.

| Final Grade Cutoffs |        |     |        |     |        |     |        |     |         |
| ------------------- | :----- | :-: | :----- | :-: | :----- | :-: | :----- | :-: | :------ |
| \+                  | 97.00% | \+  | 87.00% | \+  | 77.00% | \+  | 67.00% | \+  |         |
| A                   | 94.00% |  B  | 84.00% |  C  | 74.00% |  D  | 64.00% |  F  | \<60.0% |
| \-                  | 90.00% | \-  | 80.00% | \-  | 70.00% | \-  | 60.00% | \-  |         |

Your overall course grade will be calculated by multiplying the percentage of
points for your assignments times the percentage value of the assignment type,
summed together. For example, if you scored 120 out of 144 points on your
homework assignments, then 120/144 \* 50 \= 41.667 would be how much your
homework grade contributes to your overall course grade because the homework
category is worth 50 percent of your total grade.

## 

## **Course Outline**

|            Date | Week \# | Topic                                  | In Class           | At Home     |
| --------------: | ------: | :------------------------------------- | :----------------- | :---------- |
| **03 Sep 2025** |   **1** | **File Identification and Extraction** | Labs               | HW 1        |
| **10 Sep 2025** |   **2** | **Code Analysis**                      | Labs               |             |
| **17 Sep 2025** |   **3** | **Binary Analysis I**                  | Labs               | HW 2        |
| **24 Sep 2025** |   **4** | **Binary Analysis II**                 | Labs, Quiz         |             |
| **01 Oct 2025** |   **5** | **Cryptography, Protocols**            | Labs               | HW 3        |
| **08 Oct 2025** |   **6** | **Malware I**                          | Labs               |             |
| **15 Oct 2025** |   **7** | **Malware II**                         | Labs, Quiz         |             |
| **22 Oct 2025** |   **8** | **Group Presentation**                 | Group Presentation |             |
| **29 Oct 2025** |   **9** | **Vulnerability Analysis I**           | Labs               | HW 4        |
| **05 Nov 2025** |  **10** | **Vulnerability Analysis II**          | Labs, Quiz         |             |
| **12 Nov 2025** |  **11** | **Kernel, Rootkits**                   | Labs               | HW 5        |
| **19 Nov 2025** |  **12** | **Firmware, Memory Forensics**         | Labs               |             |
| **26 Nov 2025** |         | — Fall Break (no class) —              | **—**              |             |
| **03 Dec 2025** |  **13** | **Mobile**                             | Labs               |             |
| **10 Dec 2025** |  **14** | **CTF**                                |                    | CTF Writeup |
| **17 Dec 2025** |         | — Finals Week (no class) —             |                    |             |

**Note:** This is a tentative schedule, and subject to change as necessary –
monitor the course ELMS page for current deadlines. In the unlikely event of a
prolonged university closing, or an extended absence from the university,
adjustments to the course schedule, deadlines, and assignments will be made
based on the duration of the closing and the specific dates missed.

## **Resources & Accommodations**

### 

### **Accessibility and Disability Services**

The University of Maryland is committed to creating and maintaining a welcoming
and inclusive educational, working, and living environment for people of all
abilities. The University of Maryland is also committed to the principle that no
qualified individual with a disability shall, on the basis of disability, be
excluded from participation in or be denied the benefits of the services,
programs, or activities of the University, or be subjected to discrimination.
The
[**Accessibility & Disability Service (ADS)**](https://www.counseling.umd.edu/ads/)
provides reasonable accommodations to qualified individuals to provide equal
access to services, programs and activities. ADS cannot assist retroactively, so
it is generally best to request accommodations several weeks before the semester
begins or as soon as a disability becomes known. Any student who needs
accommodations should contact me as soon as possible so that I have sufficient
time to make arrangements.

For assistance in obtaining an accommodation, contact Accessibility and
Disability Service at 301-314-7682, or email them
at [**adsfrontdesk@umd.edu**](mailto:adsfrontdesk@umd.edu). Information about
[**sharing your accommodations with instructors**, **note taking assistance**](https://www.counseling.umd.edu/ads/currentads/)
and more is available from
the [**Counseling Center**](http://counseling.umd.edu/ads/).

### **Student Resources and Services**

Taking personal responsibility for your own learning means acknowledging when
your performance does not match your goals and doing something about it. I hope
you will come talk to me so that I can help you find the right approach to
success in this course, and I encourage you to visit
[**UMD’s Student Academic Support Services website**](http://tutoring.umd.edu)
to learn more about the wide range of campus resources available to you.

In particular, everyone can use some help sharpening their communication skills
(and improving their grade) by
visiting [**UMD’s Writing Center**](http://www.english.umd.edu/academics/writingcenter/schedule) and
schedule an appointment with the campus Writing Center.

You should also know there are a wide range of resources to support you with
whatever you might need
([**UMD’s Student Resources and Services website**](https://sph.umd.edu/content/student-resources-and-services)
may help). If you feel it would be helpful to have someone to talk to, visit
[**UMD’s Counseling Center**](https://www.counseling.umd.edu/) or
[**one of the many other mental health resources on campus**](https://tltc.umd.edu/instructors/teaching-topics/supporting-whole-student).

**Notice of Mandatory Reporting**\
Notice of mandatory reporting of sexual assault, sexual harassment,
interpersonal violence, and stalking: As a faculty member, I am designated as a
“Responsible University Employee,” and I must report all disclosures of sexual
assault, sexual harassment, interpersonal violence, and stalking to UMD’s Title
IX Coordinator per University Policy on Sexual Harassment and Other Sexual
Misconduct.

If you wish to speak with someone confidentially, please contact one of UMD’s
confidential resources, such as
[CARE to Stop Violence](https://health.umd.edu/CARE) (located on the Ground
Floor of the Health Center) at 301-741-3442 or the
[Counseling Center](https://counseling.umd.edu/) (located at the Shoemaker
Building) at 301-314-7651.

You may also seek assistance or supportive measures from UMD’s Title IX
Coordinator, Angela Nastase, by calling 301-405-1142, or emailing
titleIXcoordinator@umd.edu.

To view further information on the above, please visit the
[Office of Civil Rights and Sexual Misconduct's](https://ocrsm.umd.edu/) website
at [ocrsm.umd.edu](http://ocrsm.umd.edu/) **.**

### **Basic Needs Security**

If you have difficulty affording groceries or accessing sufficient food to eat
every day, or lack a safe and stable place to live, please
visit [**UMD’s Division of Student Affairs website**](https://studentaffairs.umd.edu/basic-needs-security)
for information about resources the campus offers you and let me know if I can
help in any way.

### **Veteran Resources**

UMD provides some additional support to our student veterans. You can access
those resources at the office of
[Veteran Student life](https://stamp.umd.edu/engagement/veteran_student_life)
and the [Counseling Center](https://www.counseling.umd.edu/aboutus/). Veterans
and active duty military personnel with special circumstances (e.g., upcoming
deployments, drill requirements, disabilities) are welcome and encouraged to
communicate these, in advance if possible, to the instructor.

## **Participation**

- Given the interactive style of this class, attendance will be crucial to
  note-taking and thus your performance in this class. Attendance is
  particularly important also because class discussion will be a critical
  component for your learning.

- Each student is expected to make substantive contributions to the learning
  experience, and attendance is expected for every session.

- Students with a legitimate reason to miss a live session should communicate in
  advance with the instructor, except in the case of an emergency.

- Students who miss a live session are responsible for learning what they miss
  from that session.

- Additionally, students must complete all readings and assignments in a timely
  manner in order to fully participate in class.

## **Course Evaluation**

Please submit a course evaluation through Student Feedback on Course Experiences
in order to help faculty and administrators improve teaching and learning at
Maryland. All information submitted to Course Experiences is confidential.
Campus will notify you when Student Feedback on Course Experiences is open for
you to complete your evaluations at the end of the semester. Please go directly
to the [**Student Feedback on Course Experiences**](http://courseexp.umd.edu/)
to complete your evaluations. By completing all of your evaluations each
semester, you will have the privilege of accessing through Testudo the
evaluation reports for the thousands of courses for which 70% or more students
submitted their evaluations.

## **Copyright Notice**

Course materials are copyrighted and may not be reproduced for anything other
than personal use without written permission.

[image1]: <data:image/png;base64,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>
[image2]: <data:image/png;base64,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>
[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABYCAIAAAAm+wNpAAANN0lEQVR4Xu1ba2+cxRXmQ2lYNl47DomDd73r2AnQSv0BfKuKKvqhamn7D6qSkNjetRM7duyN117bUWiQIA03kShCUD5E/USDlIsT4iQYsFCjBETaIuUKJk7qGIHjZO/TZ87xjmfnnXe96yyIVjyY5X1n5pzzzJkzZy673CcqhGw2i89cLmdW5IGqDMGsKB/3mQVLwrFjx9ra2iKRSJjAD+3t7eoZtVy1b98+U7h8LJ10KpXCJ5NrbW1lToti48aNW7ZsQXtTXTkojzQGN51O4+HQoUMmnfKB3o6OjmbzMI25ozzSwNzcXEtLC+ypYLgXsJ5Tp06ZZoqiPNKbN282zVYC4P3MM8+wiSJTWaEk0lCUTCa3bt0KA6WHb+kAacxUxDqsVIC0ylDQaJqyoaOjg8MGn5w9wIYf+LM4YOXo0aO6XSsWIY1+v/DCC6buPBDcYfI9AHKmsAMq8aFvLGvFyy+/bEoWYhHS165dK+KhDgIPaHHfMJB50Bi5kjtpqssD/p6amjKFNSxC2tRHUAEwMDBgCpSMbdu2FZ/WpoCGYqR55jkBup2dnaK0mV4cpmoNiB+30bOTRqoPa2uvAk9zqLt3ugqcjtwcZDVkIQ3GCGVTmoAIBunnnnvuzxXF8PAwNJvGCJgAzsXSQhpwm3wox+ahnRCpHNoIpjFCV1eXSc5K+vr166Yowc0Z3zZmZmYMhiZpjIVbeEUqsdlYAsDHIGmSRuA7MxHo7t69Wy0HiI0333zzQCWwf/9+NYCYkbFYzLpNGB8f10mapLdv3+4kDb1YF5R2le/uHdCj1OJBaKumApxlLLcLpBEY0AIvWsODkyCjlBW7dCiWMI3XI0eOKEMMjDPcr+eQAk9PTk4aAjxYXKsKraR5IcA2Tb1evHiRV2OuglU+7BjQSTMzuNY5f2ZnZ5VIAWln0zDx5lpVYiXN4OQFEYw1thB4xgPSFkIO+dhsTdBJc8C0EJQ5xqZNm5RIQXg40zO6MTExwQ1UoZV0d3d3Ox0WOQTx3EZHXdDlvI4+YL+RSCQMQSM8gOPHj1uZqAhZII1BdM5cNFUNVKFBGu5BCY4e4MfD4twzIDDCNGhoY6QwJ2nhsifhcRBGeDgHRW+qSgzS586d4+UdXNkZSkTQACoPjY2Nwd+cJRScpNHeupApkYLwsMa0aqBKrOHByQfH3mg0iqU+QicXPh/g4dKlS6qZngeEjbReqIASu6eXFh5Cu17iWIQeeBSR0EZopS0/RwXfQOhwkoYep/tUPhA6aQ5No2mJpAXxPnz4MOY4b3GylODYNyMjI4h43ZE6nKRFWTHt7J/eVJVYSfMekl3On3rmZiVONwsbaTRWthT0mVDgabMhoUTSBsDg6aefRoQ4M4kBJ2lh87RrTDvDQ+dnLXRDO2240dK6Cuqwknbuf3Sji5AOl5w9DHDO4mXMSBcGSiRtDw9hi2loPH/+PNfqhbqUG4pzVdBJc948ePCg033IHvbwMNqF6QpCJRBVWCJp2CiFt04aEwBSnCKVOQbOkUqkYCLevHnTaMrgBkZhpBLgTRUr5PAA70I781BuFoanBUWIM55YnVFYcbAV6803j60lPLgIoxCxRbabAyqIdtqaOldlrhLaJDE9LWw5pJ32mbyJ+7ZhddmtW7d0hhbShoyCqNC50A1wZBtdXxl29e0/wySNlfabb75ptY0RfJDTZoMVbumi+LrItdYrcDABH8OuSZrhHKNSEKEl0FCl7DmjrhREtB2bgp00/G1KlwB4BftP5E3nmYoPXaZACbDuseykBTl7yb7hTx1moxKwYcMGq5tFEdLYUjrnRIngbMNYcuchpS4kDLiS5t1ZR9EvR74lIJZgVLhPa1fSCnwlYCp2IEKHQtWSQ4I/2/InrkXjpJUOlMy4CBYhjWS0Z8+eEodYFJ7DFVShNZMaQJsXX3yxeIpchLRCmCLVtOCOVrpkKoWlDqTqq1evmrYdKJW0cP96wAoVEmaFO9xyhRNlkAY6OzvLol4icFYvnbEol7SgVGjavGeMjo6aZoqiPNLqhuDIkSPlxqsT8C708G7JtFQU5ZF2gleQMAUx8zCp5RGhu3G+e+ZTqtvasSjulbTC3r17u7q6ipDetm3ba6+9tgS/OlEx0gy3NayyqDBpYVtf2LvO8iWj8qS/A/xA+rtCMdKXL1/+B2FmZkafYYhOLtdx4cIFTVRw4UcffSS02Xn+/HldBHpwxsnRzzlZ5Ny5c6r92bNnUfLxxx8vKM3DlXSOruM5DRtf7fCvmrhKQf1GTdAuhQvRbOfOnWrLxl/NGLh48SJswUH8Gs5faLXlt7JKrYIraaHdJSDF6uXPP/88a8dKgfM9t2nVvl7gWoZ+26myOLb5eIZsG12noAqbu3D+kNbX15fLX5Zb9yT3RLq3t1clsixB0Jdd7Gm+eeF7I26jSPMr3/7gFYw/++wzZS5M51l+qDzpFvr9Jg9rT08P16o7RdYAT6ufrCnSfMXBB7k2unhHeChzEe0+sfKkwViFaTwe5xWERTgq2GqYftXDk0TpZEAQ212O6TDFmIo3RuVJw55+LwHbhw8fZhEed9584/PTTz/N2r6n5CsvRZrDSW+wdNKQVGfyWCymSIfpN0aqjXC/RuJpqkijA+hwmKTefvtt3dPA5OSkol42aedFNUoGBwcRo06fcRLgH3SD+sTExIcE3ou2012tksLzlStXMIARgqA1IUzRwkdxDrnwEkgjxbJSBXB65513sEbw9Y8OGDhw4ABnDGztBeUTBM/AwAC7LUc/NOLGrL+7u5tfd+/ejb01P+PwnyLABKSQ/go4EYqR/t7i/4g0RhbrQVYkRRp/6Vwixe9CpJAsMnjKiDsiJ/9BucwfCZFJywZZlKXxL/6S2n2LrEtnZTNqk0lA7V2RS+RI6R1SDpXZRE4aSmSEvJRL5/+kTE47XVhIywUsfacnVDfkr4k2euIN3mjIt+nROqKTvHnm/RG/F4WRRxqSYD7zxWBDVbzB0968ElZbHqkb8VfFQp5/v/Wq5J/Hu8PxwaA3FvTG/bW3xVxXU+1g0BNbtyJz4RPUTo+djAer+0NVn4+fQBf6QjVDAQ/U8l9/yBNt9N4cP4GusDYLaWBroFY2DVWN1NfGAyQcqAmvexjdmXr/RCxYNRTwDvirxdysuDWN12iwtju4GoIdTf7+oK+v0Xfl9dd134zFh/qDNdFQTTxQg/HrbPZtb/QNrPV2NVSL1N3P3zs9FFjZH6y9Qf9HA1pub6xF9/gv1gCpqpnTJ2lUJBZIS7fIYc2K2f8MNvhioepnA/d/dezv8Z//Iu5/ILq2usf/IIbq2pkx5YOeUHVuemqkvgae7mhaAfH2dXWyk4Gaf751QA50Hu+O9EJnPOCLBX05kepuXE0afPHgstN/2XXtw9HBpuXo0uT4MTCjllX9q72v/OFX+3795Ku/+eVLv31SpGfVyGmepkBECHx15hjEBh+u2RFcjkATc9loYPmOtcthBtXXx88o0kPNXjExinHva6wqlzSCQbpmjWe4ccX0oTcQOSD9+fioIj3i921+ZGVn46qOdQ91NK8WmZSNtJBTLC1SF954BSMO/8G7eMVcQSSA4kAAfUhOnjm1QDrgBQ+QxnO5pCXjIHk0BHHfUKAKz5PvLZCmOVCFEMWMwjNI47TA2jTSFDEovnH86HB91XCDr79plexcKhVd44n6vf1NXpG9fePkGKbFzvqa3mA1pumuxlV4hQ1FGpYwTf/11l9vkxN4W+okDU/v9K8Y69y4o37ZkF/SgpTu6WH/j//46MMt65s3Pxr800/Wi9RcQsz/nrDA03BqBtSnb/QFHtjRcD+6KBK3Ptn/0nCoaqBeKkUPrr93OkauDTfVtgQf6q3/EaigSpEmx3j2PP6zXU89sfd3T7z6+6fE3VknaTwPhKrF9FVMOyikaCnw9NCaWvH1tLj9lUhOi7mvRTKrtmYLpMn1afJLdqCpHmlreI1MUoiBvrUexPeGx/zIYohpDCjKu9bWoWXcv5ytbmmuZdJDDcv6adwx4qA4HFjxxfiZkzv7DNIyNoI+cfuumL60o+6B/pUe8P5y/LgiTVnLhwQ6KFOq92B4sz17SE/Tp8jeif40OLjKQ6laZrfex9cnM3NoNjXx/qCcNL6OdbU5LDU3r8VCy8Bv67qVkOx8zI8qJHIZ6EHPs2tqepqrvxx/99SuHcjEinTP2jo5SYIrxNdTkLr8twPDyNMND059MKaR9tGckcGN/kjSeVfb87SQiyKcD1JpTD7KKvm5K0ckQauY7CEBOf+OXLpkC1rA5AMtffSaFEjNWWqTkN9RShEovk2C0nt3ZUlCroQyt7MU5wpWJauyyOfz5txIE0epXfJCMKUzueQCb/4PDYqcZ2yIxy4jB4r/BH1iLmaRrWQ5CWaJak5qlM+sCittOiX159hZzDavh9ugPu8kF9JCESQu5OmCqgU3yK1IWpKTLOlzXna+1XybecHM/LNsmZyfQlrLBYU8bpoh+TAfH+6kv8f4gfR3hf9J0v8F8UHevNDb/vwAAAAASUVORK5CYII=>
[image4]: <data:image/png;base64,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>
[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAABRCAIAAADqw+miAAAMxklEQVR4Xu2bW2xUxxnHI+WC7+sFbMLe7Zhrq0p9qaL2JX2tVKkPPFApTVt8w5hdY8DGgL32ro2hCQmoTQJSpARZLUoiRFwBbdQkatK4UQstiFLUVEAFWDEoxhjHYHuv0//M5x3Pzjlnd712iCLlr6PlzJyZ+X4z8803c3bNI+zrrEf0jK+VFpne7/dv27atpaUFN4FAADdI4kZ+9vf3o1gikdBr5qWF0ieTyYmJCWLNXVu2bEFPqLre4ny0IPpLly6Bo7W1devWrTpgRtFUNDc3o+7Y2Jjebs7Kk/7atWubN2+GbZ0rL+3YsQN9yMOd5kcfjUZjsdhiQRul28um+dHH4/GAWIu62cUQ3AnzqZvMqFzpadThqbrNlGjhyk+sBHzu3LkzGAz6U8KjXFaIbttaudJDGdBJGDx0EvOj11Q0PDxMSzaDmpqa9GoWyk5PQS2QGldNFOAp/M1LqIh4pTeXEqZIr2CmLPRAx3AiJujNCwEaE6LXmY/QiGkMwNJCB7LuBlnomTBg5TMYP5jBRLcsQHqjQrRhowOZw2gW+oGBAb3hhyjQnz59WmdSZElPs4agoTeZEobHdCXkIWrKKhwh1ulwKVnSQ42NjRn4BgcHs/pljoJ7XL582SoWZQgJmejh0FpDMkrAKfXSC5bVGghY7wCW9HV1dcbm1OFZrIGXUuykiZavXlrIkl5vQ0jma7OZzE0IvmotTemm0oTlZxp8zOnv3r2r1aetHgSUVOl/Oh8pRnRJW8YFYOWo5vRaZdKpU6fkoy+V/uWXX5b3JJh77bXX9ApW9EaPl3sqJSU9JvTZZ5/dmJtQcs6GQdKWek/CfgwA2EqmLzZzeq1yQJk7Skr6uNBczQVI2lLvSbQbGAN/rvTovfpI9Zz9+/cfMGh0dFQWyFHSFu7pgC1zSNPT01oVE3oY1qpB4+PjNGuUzOr39+7d02Y5q6Qt3J87d04mpfr6+rQqOj1MHj9+XK8novvDpEdd48HBuOnq9NALL7ygVQukWmQGemRu2LBBX54bNz548EBtMxeptph4AZA5JOSk1zCjNwacgLJXU9I4DAuXZksmpYxGdXqM5cGDB/V6gUBCiD1EeuPYG88LJvRvvvmmVi3w0MceGMZXIhn3pHR66MaNG1q1wEOnHxkZMY59R0eHFvJN6CHjSQOvtvSIkl82PQbe+M6O05dWxZzeOGvIoX5T8kull2dBKXoDNh4zzem1ygEFV0suoqQt9V7K9JhpTm/cKeCFQ0ND6D0l5/uVXS6SkfrYsWNzhoUwWOFwWK9gRS8pNcF52traqG8nT56kDdhU6tFtcnKSbvRCKeHR9evXyT2wwIyrDmtAtqZqfvR37txpaGiADQQvtGi6r5HU1m7evEnl9UIpARfQFGRMv8UwRnqSOT0Tngf30JsR2xagGxsbM9AExCxBU1NTwMpcUqpF/EyEsKjlo+dvvPGG6Tnckh7avn271lB7ezsNw4kTJ4xxSRUTR38MJ2xnmCJV58+fB72xq2iBvMsoS/qkIWyR4Dk4vsoymgBKM7Znzx4JjQ6j2/RmZCW0Njg4mGYppUOHDqWRKbKkJ9XV1emNCeER+YZWnlaeWhJTlPmrBCaawkQZA9028R2bXlpRFvqLFy9qLZJg6cUXX9RLG+gx5DSumYWAg+VhdFSgT0xM6KUVZaFnIvZbOS7GRoOT9AgdV69exVPj/GgCotUSMh7LNGWnZ2L5gsk4NkYDWHN+8XuEmmmlpMXSCogAnxWd5UiPBQcfMB0hdMkvfp+C44ImFArJ81xmoZjVlJJMQ6SmnOhJ9fX1GexhvJuaml5//XW4ilym5DYqx+HDh41HX03YTGT5zMqVnvzbuIdLUcTAJ+aB7qmrmDG6oSUBmc6hKiY6nDVSsdzpSWgUA2z1M9YChTmBH5IV3bCF5kdPwtBmPrfMVzRj2OB0S9mUDz29JcA7dYp8BXTdRm7Kh14KU7xNKKsrmwprAOdtOink7i2qFkQv1dfXh+MNrWna3o2BxZ/6+Z/uX3rppfyIVS0OPUu505UrV2hvVunppEk5IyMjTERS+QXRQrRo9F+JvqH/6vQN/VenhdJTVEGcUXdKBBMKjtgHsPnTL3bIRKiR5Zny3uzP+AKVQQuipwOPfKOTEVDmyAAvf/GjfITUo0eP0g31JD8tiN4v/j5HbrSUibMhbVh4NDMzs3v3bjpjXrhwQdLL7uGwFIlE0ludh/KkpwMz7Upnz56lzRXbJz0l3IDYd3GGGRwcRJempqaML1PkVHkrT3om/nTHL14CseHLszsTHZN/rEUzEBCv52NjY0b6V155JZdzvJXypE+mftNrFX/GKz1BLUO/weD8I6eCKauc1gMeZX1tz6A86Y8cOUJHFzpgEkpA/Eih/pXBmTNnZD7NDCVpTlrE96F4pH0xkbvypJdHMRxxtddFpvx40SJCCt3A7+WXuxQi5dOBgQHdQG7Kh56iCgzLNYcc+vYUmVgGcAasCnIqeDx9f434w0SYIqEYfR/hFydQtf3clY0+ybRJ5ckk/SPTqZzk3H8L4M5AjxL8RryBKOXpNp5qTZNoSs8WaS0znT5VLZ66ROscSOZgoJMsBk5ZGJdYd4mYWkwSxPljkRkTmQkipopki/+TSKV5w1FeOC6a5CUTuEnyYdDxFfqE2TVLEJE5/M80RH4sEWd8pKPiSqBT3KSsSF2PRmZ4z0AUEyzgQMUoLwC8KGUnROHZ4QDmtKjLC8cJGUVnkiwS5+2k/a+POfoOry3kLgs5S3pcJfKTjd461lz7K+dsTthV2lnxmH+dD29H6Ebs0rk+Z0HQZWutdiajsR7PMlkx6CnocZUe8JSx0dts7LM+RxHy+3/4fTbDbnxyBvfIuffX99nMA7TQ5S7dt7Ik7CzqdhW2OcvZ+C3Bn4hH7je47F2OJWG3vd9V1lll+8/xoxKYSXp4ZbvPFnYX97pKg55yXJ1e/skm7rzVUhv0PNHufKLbUdBbbev2lPY6y3atWoGVGr18IewqC7lLW6vtsNbtKev0FSOnx7msx1vSWVWy31PMvhhj4593e3j+zicfZYn7o2c/DnpQq2x46CMWi8Jit0iG3YVBbzEYOlc8/tkH74EqsMoVchR2O/moBatsaKHXWX7tvd9zX+KXQr+zyhbyFO+rsv+9p3X4o3fpwqN3tjZ0eZ/Y5yj6sDfIopPcjKu0z1fIhv9npA96S0OucnZ/nEUn2PQUm7qNeCTpUXd3te3uJ0NGejxl8TuD3Xu6PCUhT2HYVwF36ap8FCXD7mXo85HtW5pWVTevr3lu3Sq5AObod1Tbel3FfR5b21MVDWvddKGXJ/x1oA9X2d/f1ciG/wtWDECvp4iNXDXS88tbKFjLUazLVcLiDyR9p6+wv8r2z9AOIz0uzhNlwZXAgImlcTbT4bUHvYUHqpe3Owv2VRbvdVdcO/U7ETmYPvbwHHBgXPGJpmk24ywKeniOyEdmsTBcumPNCr5QDfRhjlK8q/Jxjutcip5wMyn6531L4RvCOXV6JLGEsXT7nXY4T4+7gC/lmfv7qyvDniVhh73Ts/TASsxtcVN1uRh4Hg10erS12wenL6MLhfjYe4pgr9PLRz3EOUr5mkpGjPTiKmUTI9zd4T/3b/Pjb4r+L4Habnc5ChjpkR8RYajbKVwfkxaJspl7LD7FZibZnRvN1XYA7HOW9a7EiMQocqr0dr5oHKWfDrxKmVwJ9naAew4efRja419fs9fHV+0/Xj0ILDP6Yhhor7Dt8i7jl7Pk1p9OS/q3W5reDQXDVWVGeiR31Xh6nloOZwv6lrRVVWIq+n1L2z0FCF9+j317ZSEtOTGm5DhKxNzpq9i7YkmosuTT3x6RmZi+t/y1Hb6CXsfjH4SDLDbV99TSNkQ3h51F709c+tsBRzFs71qPGMra3RyRLiwhjHHPyqKpoQ/YFyPPPwmfLB/c1gjPDq1e3l5VEnIVDH/8ByB2VyxB+b1VS7Die2vK+z32DpcNhjC69T5nyPlYt6+o123nrusq6vOVR/59LuX6Cn3XT370s5qVm9ZUsds3ZCZ0a+jD59Y562oc4/86C1/b++Nn6tZ7A9/2/aZxM4tPblrrqF/j2PyDp7Hd+L/33YZV3vrVXnw2rHbjpmltNfv8c0SMTWtdDatdV//8Rz5m09Ob1jt/8S03mxgFfd13qn+51lu7xl27xtv2zNNsbJglsY3Rvp5gkcnadZ7tNY7mGs+v63/OpifEm5jYxPSTAl8Ksw9Smt0CaaZISEUoZMk9dfaDsvjF90raMVNVkiIxuw3NZjFxDEmkTgF8J+YXR6ftedY+FcbuO8PTdPGHCr2kVvDTmZSstMJKz4yaa009qMya11pTLKfdz0nkykf/B4lOOPAySOyvAAAAAElFTkSuQmCC>
[image6]: <data:image/png;base64,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>
