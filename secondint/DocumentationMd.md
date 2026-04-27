# KALI.CO — Front-End Web Development Project

## Project Team
- **MohamedElghali Elrasheed Mohamed** (ID: 241012821)
- **Kareem Adel KamalEldeen** (ID: 241005988)

**Course:** Web Programming  
**Date:** April 2026

---

## 1. Project Overview

Hello! Welcome to the documentation for **KALI.CO**, an e-commerce fashion website built for our Web Development course.

The goal of this project was to design and build a clean, responsive front-end interface from scratch. Currently, the project is a functional static prototype. In the next phase of the course, we will integrate PHP to make the website dynamic (such as pulling products from a database and handling user logins).

---

## 2. Technology Stack

We intentionally avoided heavy frameworks (like React or Bootstrap) to demonstrate a solid understanding of core web technologies:

### HTML5
- We used **semantic tags** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) to ensure the code is accessible and easy for search engines to read.

### CSS3
- All styling is custom. We used CSS Variables for consistent colors, Flexbox for alignments (like the navigation bar), and CSS Grid to create the responsive product layouts.

### Vanilla JavaScript
- We wrote simple, lightweight scripts to handle interactive elements, such as navigating between the "Home" and "About" views without reloading the page.

### PHP & MySQL
- Our code is structured so that the header and footer can easily be split into PHP includes, and the hardcoded products will be replaced with dynamic database loops.

---

## 3. How the Code is Structured

Currently, the application runs from a single file to make previewing easy.

### The Header & Footer
These elements stay visible on every screen.

---

## 4. How the Final Project Will Look Like

### Home Page
 d:\Users\ghali\Downloads\customerReviewSection.png 
 d:\Users\ghali\Downloads\home2.png
  d:\Users\ghali\Downloads\home1.png

*Description: The home page features a hero section with a call-to-action, followed by a grid of featured products.*

### About Us Page
d:\Users\ghali\Downloads\Aboutus.png


*Description: The About Us page includes company information, mission statement, and an image gallery.*

---



### Login Page
- Added a `Login` button to the top navigation bar.
- Created `login.html` with a simple email/password form.
- Styled the login form using shared `styles.css`, including card layout, input fields, and a submit button.


### Categories Navigation
- Added a `Categories` dropdown menu in the main header.
- Updated dropdown links to point to cloth categories: `Casual`, `Formal`, and `Accessories`.
- Created `categories.html` with a category card layout and descriptive text for each category.
- Removed the category page images, keeping the layout simple and consistent.

### Casual Category Page
- Built `casual.html` to match the site's header/footer layout.
- Replaced the original inline table with the shared product grid style.
- Used existing product card components to present the casual clothing items.








