// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWqzzJEYOzrVMaEMf6HFs29zC8-LdPmSI",
    authDomain: "bahon-71454.firebaseapp.com",
    databaseURL: "https://bahon-71454-default-rtdb.firebaseio.com",
    projectId: "bahon-71454",
    storageBucket: "bahon-71454.firebasestorage.app",
    messagingSenderId: "137251206557",
    appId: "1:137251206557:web:745f028dc37165f5636b74",
    measurementId: "G-4R1DT12J1G"
  };
  
  // Initialize Firebase
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
  import { getFirestore, collection, query, orderBy, onSnapshot, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // Function to fetch and display data
  function fetchJourneys() {
    // Query the users collection
    const usersRef = collection(db, 'users');
    
    // Get all users
    onSnapshot(usersRef, (querySnapshot) => {
      querySnapshot.forEach(async (userDoc) => {
        // Get the journeys subcollection for each user
        const journeysRef = collection(userDoc.ref, 'journeys');
        const q = query(journeysRef, orderBy('entry_time._seconds'));
        
        // Get snapshots of the journeys
        onSnapshot(q, (journeySnapshot) => {
          journeySnapshot.forEach(async (journeyDoc) => {
            // Get journey data
            const journeyData = journeyDoc.data();
  
            // Calculate total_time_taken
            const entryTime = new Date(journeyData.entry_time._seconds * 1000);
            const exitTime = new Date(journeyData.exit_time._seconds * 1000);
            const totalTimeTaken = (exitTime - entryTime) / 60000; // in minutes
  
            // Calculate distance travelled and fare
            const distanceTravelled = journeyData.distance_travelled_km;
            const fare = journeyData.fare;
            const farePerKm = journeyData.fpkm;
  
            // Create a table row and append it to the HTML
            const tableRow = document.createElement('div');
            tableRow.classList.add('grid', 'grid-cols-3', 'sm:grid-cols-12', 'border-b', 'border-stroke', 'dark:border-strokedark');
            tableRow.id = `journey-${journeyDoc.id}`;
  
            // Serial number
            const serial = document.createElement('div');
            serial.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            serial.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${journeySnapshot.docs.indexOf(journeyDoc) + 1}</p>`;
            tableRow.appendChild(serial);
  
            // Passenger name (Assumed from user data)
            const passengerName = document.createElement('div');
            passengerName.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            passengerName.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${userDoc.data().name}</p>`;
            tableRow.appendChild(passengerName);
  
            // Card number
            const cardNumber = document.createElement('div');
            cardNumber.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            cardNumber.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${userDoc.data().cardNumber}</p>`;
            tableRow.appendChild(cardNumber);
  
            // Entry point
            const entryPoint = document.createElement('div');
            entryPoint.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            entryPoint.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${journeyData.entry_point}</p>`;
            tableRow.appendChild(entryPoint);
  
            // Entry time
            const entryTimeDiv = document.createElement('div');
            entryTimeDiv.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            entryTimeDiv.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${entryTime.toLocaleString()}</p>`;
            tableRow.appendChild(entryTimeDiv);
  
            // Exit point
            const exitPoint = document.createElement('div');
            exitPoint.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            exitPoint.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${journeyData.exit_point}</p>`;
            tableRow.appendChild(exitPoint);
  
            // Exit time
            const exitTimeDiv = document.createElement('div');
            exitTimeDiv.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            exitTimeDiv.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${exitTime.toLocaleString()}</p>`;
            tableRow.appendChild(exitTimeDiv);
  
            // Total distance
            const totalDistance = document.createElement('div');
            totalDistance.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            totalDistance.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${distanceTravelled} KM</p>`;
            tableRow.appendChild(totalDistance);
  
            // Total time
            const totalTime = document.createElement('div');
            totalTime.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            totalTime.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${totalTimeTaken.toFixed(2)} min</p>`;
            tableRow.appendChild(totalTime);
  
            // Fare per KM
            const farePerKmDiv = document.createElement('div');
            farePerKmDiv.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            farePerKmDiv.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${farePerKm} BDT</p>`;
            tableRow.appendChild(farePerKmDiv);
  
            // Fare
            const fareDiv = document.createElement('div');
            fareDiv.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            fareDiv.innerHTML = `<p class="text-[13px] font-medium text-black dark:text-white">${fare} BDT</p>`;
            tableRow.appendChild(fareDiv);
  
            // View Details button
            const viewButtonDiv = document.createElement('div');
            viewButtonDiv.classList.add('flex', 'items-center', 'justify-center', 'p-2.5', 'xl:p-5');
            const viewButton = document.createElement('button');
            viewButton.classList.add('rounded-lg', 'bg-[#015FC9]', 'px-3', 'py-1', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-blue-800');
            viewButton.innerHTML = 'View Details';
            viewButton.onclick = () => toggleDetails(journeyDoc.id);
            viewButtonDiv.appendChild(viewButton);
            tableRow.appendChild(viewButtonDiv);
  
            // Append the row to the main table body
            document.querySelector('.journey-list').appendChild(tableRow);
          });
        });
      });
    });
  }
  
  // Call the function to fetch and display data
  fetchJourneys();
  