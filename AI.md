The only that assisted while making the app was Google Gemini 3.1 Pro.
<br/>
https://share.gemini.google/j0ZehbFhBY6j 
<br/>
Prompts were focused specifically on building the frontend, backend, tests and solving the occuring issues on the way.
<br/>
Around 80 user input prompts in total from 1 continous conversation.
<br/>
The following prompts were used throughout the conversation: 

<br/>

* **Initial Project Brief**: "# Resort Map — Code Test *You are creating the world's first interactive cabana booking website for luxury resorts. Can I make it a react app with some sort of fast API since it uses a json file for the backend right?"

<br/>

* **Frontend Setup**: "Help me create the frontend part for now? I would also like to include a simple login with an email for the starting point. And then the actual panel with the map for the next step. Also, let's include the routing (react router). Mind I am on windows so I prefer to use npm and node.js + vite like you said. The app should look nice and modern."

<br/>

* **Architecture Structuring**: "I want the app file to look like this: export default function App() { return (          ); } So, there should be a separate routes.tsx file"

<br/>

* **File Cleanup**: "After I added Vite, do I need all of those App.css, index.css, main.tsx or just App.tsx?"

<br/>


* **Debugging npm**: "After npm install npm error code ENOENT npm error syscall open npm error path C:\Users\oszef\Desktop\ResortMap\ResortMapCodeTest\frontend\package.json"

<br/>

* **Tailwind CSS**: ":root --text: #6b6375; --text-h: #08060d; So, I can replace this with @tailwind base;@tailwind components;@tailwind utilities;?"

<br/>

* **CSS Linter Error**: "Uknown rule at tailwind.css"

<br/>

* **Tailwind Config**: "Is the tailwind config correctly placed?"

<br/>

* **TypeScript Modules**: "import { MapApiResponse, MapTileData } from './types.ts'; says cannot find module. I placed it inside the frontend folder as shown on the screenshot"

<br/>

* **TypeScript Types**: "'MapTileData' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled, 'MapApiResponse' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled."

<br/>

* **Empty File Inquiry**: "Why is the MapTile.tsx file empty for now?"

<br/>

* **Code Update**: "import React, { useEffect, useState } from 'react'; Send me a fully updated version of this"

<br/>

* **Missing Providers**: "Cannot find module './providers/LanguageProvider' or its corresponding type declarations and other providers too"

<br/>

* **Simplifying Router**: "I do not use those, can it be simplified to this? import { RouterProvider } from 'react-router-dom'; import { router } from './routes'; export default function App() { return (  ); }"

<br/>

* **Testing UI**: "Can I do npm run dev now to see how it looks without the backend?"

<br/>

* **Data Provision**: "Remember I have the bookings.json file and map.ascii"

<br/>

* **Styling Request**: "Is it possible to update the design of this web app to make it look modern and nice? Similar to the designs done in Figma or Replit?"

<br/>

* **CSS Verification**: "@tailwind base; @tailwind components; @tailwind utilities; @layer base :root [...] This is the current index.css"

<br/>

* **Import Verification**: "import { StrictMode } from 'react' import { createRoot } from 'react-dom/client' import './index.css' import App from './App.tsx' createRoot(document.getElementById('root')!).render(   , ) I have it here"

<br/>

* **Tailwind Reinstall**: "How do I reinstall tailwind?"

<br/>

* **Tailwind CLI Error**: "Maybe the second command is an issue? PS C:\Users\oszef\Desktop\ResortMap\ResortMapCodeTest\frontend> npx tailwindcss init -p npm error could not determine executable to run"

<br/>

* **Dark Mode Feature**: "Since this is a dark mode, would it be possible to add a button at the top right corner to switch between light and dark modes? for all pages"

<br/>

* **Dark Mode Components**: Several prompts followed where code was pasted and asked to "update with the dark prefix" or "Send me an updated version".

<br/>

* **Testing Functionality**: "So, now it will be possible to switch between dark and light modes?"

<br/>

* **Event Type Warning**: "@deprecated FormEvent doesn't actually exist. You probably meant to use ChangeEvent, InputEvent, SubmitEvent, or just SyntheticEvent instead depending on the event type."

<br/>

* **UI Tweaks**: "The sign out should be moved more to the left as it overlaps with the mode/theme button."

<br/>

* **Image Assets**: "I think now this can be updated with the backend map.ascii and json file to make it more readable for a human. I was also provided with this assets folder"

<br/>

* **Architecture Inquiry**: "So scan through our dicussion again and before we proceed with anything tell if it is possible to do a no sql backend as we dicussed earlier? Just say if it can be done"

<br/>

* **Backend Approach**: "I don't think I need to go that deep though. I just need the frontend as it is and fuctional backend, that's it. So, this can be done relatively quickly?"

<br/>

* **Component Assembly**: Several prompts delivering individual components to be updated with the backend functionality (BookingModal, MapTile, ResortMap, ThemeToggle, LoginPage).

<br/>

* **Backend Setup**: "Need to install the following packages: ts-node@10.9.2 Ok to proceed? (y) y npm notice run npx npm notice run ts-node src/server.ts"

<br/>

* **Backend Details**: "Hold on. Can you remind what needs to be placed inside the backend directory as it is empty right now?"

<br/>

* **Backend TS-Node Error**: "const fileExists = ts.sys.fileExists, readFile = ts.sys.readFile, TypeError: Cannot read properties of undefined (reading 'fileExists')"

<br/>

* **UI Verification**: "Is this what this is supposed to look like?"

<br/>

* **Requirement Checks**: "Is all this already fulfilled? The legend seems to show only 3 things. Should the Map react file be updated again?"

<br/>

* **Server Code Check**: "So, the server.ts should look like this? import express from 'express';"

<br/>

* **Server Final Check**: "So, now it's all good? import express from 'express';"

<br/>

* **Additional Assets**: "There seems to be more icons in the asset folder. I mean arrow, texture water. What should I use those for?"

<br/>

* **Asset Requirements**: "It says Displays a visual map of the resort using tiles from assets. But does it mean i need to use all the tiles including the arrows (roads)?"

<br/>

* **CLI Requirements**: "Let's do the following now: Single entrypoint: Provide a single command"

<br/>

* **CLI Simplification**: "Is it possible to simplify it to node run.js?"

<br/>

* **Testing Requirements**: "Now, the tests - Automated Tests: Include automated tests covering core backend and frontend functionality."

<br/>

* **Jest Dependency Error**: "npm error code ERESOLVE npm error ERESOLVE unable to resolve dependency tree"

<br/>

* **Jest File Generation**: "I got jest.config.js but not the server.ts file"

<br/>

* **Testing Directory**: "But do I need to go into the src where the original backend file is located and then create the test?"

<br/>

* **Testing Automation**: "But I want to generate it instead automatically. Before I did in the backend directory but not inside src"

<br/>

* **Jest Global Errors**: "Cannot find name jest, describe, beforeEach"

<br/>

* **TypeScript Errors in Testing**: "Argument of type '(path: string) => string' is not assignable to parameter of type 'UnknownFunction'."

<br/>

* **TS-Jest Version Error**: "FAIL src/server.test.ts ● Test suite failed to run The TypeScript compiler "typescript" (version 7.0.2) does not expose the JavaScript compiler API required by ts-jest. [...]"


* **TS Import Error**: "ts-jest[config] (WARN) message TS151001: If you have issues related to imports, you should consider setting esModuleInterop"

<br/>

* **TSConfig Generation**: "I had to create a tsconfig file since it was not existant. What should it look like? it is empty for now"

<br/>

* **Frontend Testing**: "so, now for the frontend"

<br/>

* **Vitest TS Error**: "No overload matches this call. The last overload gave the following error. Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'.ts(2769)"

<br/>

* **Vitest Setup File**: "Maybe this is because I don't have the setupTests.ts file under src in frontend yet"

<br/>

* **Vitest Directory Structure**: "I also have this tests directory but it is empty for now. Maybe I should put it there instead?"

<br/>

* **Frontend Test Creation**: "But I haven't created any tests yet in the frontend. What is the step to do so as it was done with the backend (tests passed correctly)"

<br/>

* **Vitest Reference Error**: "import { defineConfig } from 'vite' again, overload matches this call."

<br/>

* **Vitest Continued Error**: "Still the same issue"

<br/>

* **Test Status**: "Done. Looks fine, what should be the next step?"

<br/>

* **Vitest Missing Files**: "PS C:\Users\oszef\Desktop\ResortMap\ResortMapCodeTest\frontend> npx vitest run. No test files found, exiting with code 1"

<br/>

* **Test Scope**: "So, this is the only test for the frontend to perform? For the ResortMap?"

<br/>

* **Test Import Errors**: "Module '"c:/Users/oszef/Desktop/ResortMap/ResortMapCodeTest/frontend/src/components/ResortMap"' has no default export. Also Cannot find name global, toBeInTheDocument"

<br/>

* **Vitest Module Resolution Error**: "❯ ResortMap.test.tsx (0 test) Error: Cannot find module '/@id/C:/Users/oszef/Desktop/ResortMap/ResortMapCodeTest/frontend/tests/tests/setupTests.ts'"

<br/>

* **Testing Library Error**: "FAIL ResortMap.test.tsx > ResortMap UI > renders map and handles clicking an unavailable cabana TestingLibraryElementError: Found multiple elements with the text: /Cabana $W$/i"

<br/>

* **LocalStorage Mock Error**: "PS C:\Users\oszef\Desktop\ResortMap\ResortMapCodeTest\frontend\tests> npx vitest run
TypeError: Cannot read properties of undefined (reading 'getItem')"

<br/>

* **Login Code Check**: "What was the code for the LoginPage again?"

<br/>

* **Login Test Check**: "I mean the test file"

<br/>

* **Login Import Error**: "Module '"../src/pages/LoginPage"' has no exported member 'Login'"

<br/>

* **Login Test Failure**: "FAIL Login.test.tsx > Login UI > renders the login form and allows typing TestingLibraryElementError: Unable to find an element with the placeholder text of: /Room Number/i"

<br/>

* **Test Success**: "Got it. All passed"
