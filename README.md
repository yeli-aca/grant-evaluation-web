# grant-evaluation-web

## ⭐ Features

This tool helps streamline the evaluation process and visualizes the scoring outcome, making it easier to compare and prioritize funders, you can:

- Input a funder’s name.
- Answer 10 yes/no questions related to funding criteria.
- Get access to automatically calculated score (out of 10) and the ranking among all funders.

## 📔 About Project

This project (_B4H-MI-GEW-YM2025_) was developed as part of a micro-internship hosted by _King’s College London_ (Micro-Internship Program), focusing on identifying and evaluating potential grant-making organizations for a non-profit client.

- 🧩 **Project Overview**
  The main goal of this micro-internship was to assess various philanthropic funders and determine which are most aligned with the client’s mission. Our team analyzed multiple grant sources, scored them using a set of predefined criteria, and produced a summary report and presentation for the client.

- 💻 **My Contribution**
  To support our team’s research and enhance interactivity, I designed and implemented this entire web-based tool by myself.

- 🔧 **Technologies Used**
  - HTML, CSS, Typescript
  - Vue 3.5.17, vite 7.0.5, Inspira UI
  - Currently, only the front end is being used.

## 🧷 Uasage

See [demo](https://yeli-aca.github.io/grant-evaluation-web/) hosted by _github pages_.

## 📂 Configuration

- If you want to **reconfigure the questions**, please edit `/src/assets/questions.json`
- If you want to **change the preset grants used for evaluating the comparison**, please edit `/src/assets/grants.json`

## 📠 Recompilation

### 1. Prerequirements

- Nodejs 22.16.0
- Vite 7.0.5

### 2. Installation
```sh
npm install
```

### 3. Building

```sh
npm run build
```
