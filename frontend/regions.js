async function renderRegions() {
    stopFetch();
    document.getElementById('search').style.visibility = 'visible';
    tableContainer.innerHTML = '';
    treeContainer.innerHTML = '';
    mapContainer.innerHTML = '';
    if (datatable) datatable.destroy();

    let title1 = document.createElement('h4');
    title1.classList.add('text-center', 'mt-2', 'fw-normal');
    title1.style.marginBottom = '20px';
    title1.textContent = 'Regions of the Czech Republic';
    mapContainer.appendChild(title1);

    fetch('svg/regions.svg', { signal })
        .then(response => response.text())
        .then(svg => {
            mapContainer.innerHTML += svg;
        });

    fetch(`${db}/stats/regions`, { signal })
        .then(response => response.json())
        .then(data => {
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');

            // Create table header
            let headers = ['Region', 'Capital', 'Area (km²)', 'Population', 'Population Density (/km²)'];
            let tr = document.createElement('tr');
            headers.forEach(header => {
                let th = document.createElement('th');
                th.textContent = header;
                th.style.textAlign = 'center';
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);

            for (let region in data.info) {
                let tr = document.createElement('tr');
                let td;

                td = document.createElement('td');
                td.textContent = region;
                tr.appendChild(td);

                td = document.createElement('td');
                td.textContent = data.info[region].capital;
                tr.appendChild(td);

                td = document.createElement('td');
                td.textContent = parseInt(data.info[region].area).toLocaleString('en-US');
                td.style.textAlign = 'right';
                tr.appendChild(td);

                td = document.createElement('td');
                td.textContent = parseInt(data.info[region].totalpopulation).toLocaleString('en-US');
                td.style.textAlign = 'right';
                tr.appendChild(td);

                td = document.createElement('td');
                td.textContent = Math.round(data.info[region].populationdensity).toLocaleString('en-US');
                td.style.textAlign = 'right';
                tr.appendChild(td);

                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

            // Append the table to the table container
            tableContainer.appendChild(table);

            table.id = 'myTable'; table.classList.add('table', 'table-striped', 'table-bordered');
            datatable = new DataTable('#myTable', {
                dom: 'tpl'
            });
        });

    let countryList = document.createElement('ul');
    countryList.style.marginTop = '45px';
    let topElement = document.createElement('li');
    topElement.textContent = 'Czech Republic';
    topElement.style.fontSize = '.875rem';

    let regionList = document.createElement('ul');
    await fetch(`${db}/stats/regions`, { signal })
        .then(response => response.json())
        .then(data => {
            for (let region in data.info) {
                let element = document.createElement('li');
                let a = document.createElement('a');
                a.textContent = region;
                a.id = 'link'; a.href = '#'; a.style.fontSize = '.875rem';
                a.onclick = () => {
                    const area = document.getElementById(region);
                    renderDistricts(area);
                    return false;
                };
                a.onmouseover = () => {
                    const area = document.getElementById(region);
                    area.style.fill = '#2362a2';
                };
                a.onmouseout = () => {
                    const area = document.getElementById(region);
                    area.style.fill = '';
                };
                element.appendChild(a);
                regionList.appendChild(element);
            }
        });

    countryList.appendChild(topElement);
    countryList.appendChild(regionList);
    treeContainer.appendChild(countryList);
}
