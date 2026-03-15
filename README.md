# Angular Signals + rxResource + Third-Party API Demo

This project demonstrates a modern Angular application built using the latest Angular features such as **Signals**, **Control Flow syntax**, and **rxResource** for reactive data management.
It also integrates with a **third-party REST API** using Angular’s `HttpClient` to fetch and manage external data.

The goal of this project is to showcase a clean and scalable approach to **state management, asynchronous data handling, and API integration** using Angular’s newest reactive primitives.

---

## Features

### Signals-based state management

* Uses **Angular Signals** to manage component state in a reactive and predictable way.
* Reduces the need for complex RxJS patterns for local state.
* Automatically updates the UI when state changes.

### Modern Angular Control Flow

The project uses the new Angular template syntax:

* `@if`
* `@for`
* `@switch`

These provide:

* Better readability
* Improved performance
* More maintainable templates compared to traditional structural directives.

### rxResource for async data management

* Uses **`rxResource`** to handle asynchronous data fetching.
* Automatically manages:

  * Loading state
  * Error handling
  * Data updates
* Integrates seamlessly with Signals for reactive UI updates.

### Third-party API integration

* A dedicated **Angular service** uses `HttpClient` to consume a third-party REST API.
* Demonstrates best practices for:

  * Data fetching
  * Separation of concerns
  * Reusable service architecture.

Example responsibilities of the service:

* Fetch external resources from the API
* Transform or map API responses
* Provide Observables that can be consumed by `rxResource`

### Reactive UI updates

Components react automatically to state changes using Signals, ensuring the UI remains synchronized with the data layer.

---

## Architecture Overview

The application follows a clean and maintainable structure:

* **Services**

  * Handle communication with external APIs using `HttpClient`.

* **Resources**

  * `rxResource` manages asynchronous data flows and loading states.

* **Components**

  * Use Signals to maintain reactive UI state.

* **Templates**

  * Implement the new Angular Control Flow syntax for cleaner rendering logic.

---

## Tech Stack

* Angular (latest version)
* TypeScript
* RxJS
* Angular Signals
* rxResource API
* HttpClient
* REST API integration

---

## Purpose

This repository serves as a **learning and reference project** for developers interested in modern Angular patterns.

It demonstrates how to combine:

* **Signals**
* **rxResource**
* **HttpClient API services**
* **Modern template control flow**

to build applications that are **reactive, scalable, and easier to maintain**.
