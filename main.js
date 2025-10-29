document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATA ---
    let coffees = [
        { id: 1, name: 'City', roast: 'medium' },
        { id: 2, name: 'Cinnamon', roast: 'light' },
        { id: 3, name: 'Half City', roast: 'light' },
        { id: 4, name: 'Light City', roast: 'light' },
        { id: 5, name: 'Full City', roast: 'medium' },
        { id: 6, name: 'Vienna', roast: 'dark' },
        { id: 7, name: 'French Roast', roast: 'dark' }
    ];

    // --- 2. DOM ELEMENTS ---
    const coffeeList = document.getElementById('coffee-list');
    
    // Filter form elements
    const filterNameInput = document.getElementById('filter-name');
    const filterRoastSelect = document.getElementById('filter-roast');
    const filterForm = document.getElementById('filter-form'); 

    // Add form elements
    const addForm = document.getElementById('add-form');
    const addNameInput = document.getElementById('add-name');
    const addRoastSelect = document.getElementById('add-roast');


    // --- 3. FUNCTIONS ---

    /**
     * Renders a given array of coffee objects to the DOM.
     * (UPDATED for new Dashboard Card UI)
     */
    function renderCoffees(coffeesToRender) {
        // Clear the current list
        coffeeList.innerHTML = '';

        // Handle case where no coffees match
        if (coffeesToRender.length === 0) {
            // Updated empty state
            coffeeList.innerHTML = `
                <div class="col-span-full text-center p-12 bg-white rounded-lg shadow-md border border-slate-200">
                    <h2 class="text-2xl font-semibold text-slate-600">No coffees match your filters.</h2>
                    <p class="text-slate-400 mt-2">Try adjusting your search or add a new coffee!</p>
                </div>
            `;
            return;
        }

        // Create and append an element for each coffee
        coffeesToRender.forEach(coffee => {
            const coffeeEl = document.createElement('div');
            
            // These classes create the "card" for each coffee
            coffeeEl.className = 'bg-white p-6 rounded-lg shadow-md border border-slate-200 transition-all hover:shadow-lg';
            
            // Use a color-coded badge for the roast
            let badgeColor = '';
            switch (coffee.roast) {
                case 'light':
                    badgeColor = 'bg-yellow-100 text-yellow-800';
                    break;
                case 'medium':
                    badgeColor = 'bg-blue-100 text-blue-800';
                    break;
                case 'dark':
                    badgeColor = 'bg-gray-700 text-gray-100';
                    break;
            }

            // Updated HTML structure for the card
            coffeeEl.innerHTML = `
                <div class="flex justify-between items-baseline mb-2">
                    <h2 class="text-2xl font-bold text-slate-800 truncate" title="${coffee.name}">${coffee.name}</h2>
                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeColor}">${coffee.roast}</span>
                </div>
                <p class="text-sm text-slate-500">ID: ${coffee.id}</p>
            `;
            coffeeList.appendChild(coffeeEl);
        });
    }

    /**
     * Gets current filter values, filters the master list, and calls renderCoffees.
     */
    function updateFilteredList() {
        const nameFilter = filterNameInput.value.toLowerCase();
        const roastFilter = filterRoastSelect.value;

        let filteredCoffees = coffees;

        if (roastFilter !== 'all') {
            filteredCoffees = filteredCoffees.filter(coffee => coffee.roast === roastFilter);
        }

        if (nameFilter) {
            filteredCoffees = filteredCoffees.filter(coffee =>
                coffee.name.toLowerCase().includes(nameFilter)
            );
        }
        
        renderCoffees(filteredCoffees);
    }

    /**
     * Handles the submit event for the "Add a Coffee" form.
     */
    function handleAddCoffee(event) {
        event.preventDefault(); 

        const newName = addNameInput.value.trim();
        const newRoast = addRoastSelect.value;

        if (!newName) {
            alert('Please enter a coffee name.');
            return;
        }

        const newCoffee = {
            id: Date.now(), // Use timestamp for ID
            name: newName,
            roast: newRoast
        };

        // Add to the beginning of the list (newest first)
        coffees.unshift(newCoffee);

        addNameInput.value = '';
        addRoastSelect.value = 'light';

        // Set focus back to the name input for quick adding
        addNameInput.focus();

        updateFilteredList();
    }

    // --- 4. EVENT LISTENERS ---
    filterNameInput.addEventListener('input', updateFilteredList);
    filterRoastSelect.addEventListener('change', updateFilteredList);
    filterForm.addEventListener('submit', (e) => e.preventDefault());
    addForm.addEventListener('submit', handleAddCoffee);

    // --- 5. INITIAL RENDER ---
    // Sort by name by default
    coffees.sort((a, b) => a.name.localeCompare(b.name));
    renderCoffees(coffees);
});