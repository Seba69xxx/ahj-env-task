export default class TableSorter {
  constructor(element) {
    this.element = element;
    this.intervalId = null;
    this.data = [
      { id: 26, title: "Побег из Шоушенка", imdb: 9.30, year: 1994 },
      { id: 25, title: "Крёстный отец", imdb: 9.20, year: 1972 },
      { id: 27, title: "Крёстный отец 2", imdb: 9.00, year: 1974 },
      { id: 1047, title: "Тёмный рыцарь", imdb: 9.00, year: 2008 },
      { id: 223, title: "Криминальное чтиво", imdb: 8.90, year: 1994 }
    ];
    
    this.sortOrder = [
      { prop: 'id', dir: 'asc' },
      { prop: 'id', dir: 'desc' },
      { prop: 'title', dir: 'asc' },
      { prop: 'title', dir: 'desc' },
      { prop: 'year', dir: 'asc' },
      { prop: 'year', dir: 'desc' },
      { prop: 'imdb', dir: 'asc' },
      { prop: 'imdb', dir: 'desc' },
    ];
    this.currentSortIndex = 0;
  }

  init() {
    this.renderTable();
    this.startSortingCycle();
  }

  renderTable() {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th data-prop="id">ID</th>
          <th data-prop="title">Title</th>
          <th data-prop="year">Year</th>
          <th data-prop="imdb">IMDB</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    
    this.data.forEach(item => {
      const row = document.createElement('tr');
      row.dataset.id = item.id;
      row.dataset.title = item.title;
      row.dataset.year = item.year;
      row.dataset.imdb = item.imdb.toFixed(2);

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>
      `;
      tbody.append(row);
    });

    this.element.classList.add('table-container');
    this.element.append(table);
    this.tbody = tbody;
    this.headers = table.querySelectorAll('th');
  }

  startSortingCycle() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const { prop, dir } = this.sortOrder[this.currentSortIndex];
      this.sortGrid(prop, dir);
      this.currentSortIndex = (this.currentSortIndex + 1) % this.sortOrder.length;
    }, 2000);
  }

  sortGrid(prop, dir) {
    this.headers.forEach(th => {
      th.textContent = th.textContent.replace(/ ↑| ↓/g, '');
      if (th.dataset.prop === prop) {
        th.textContent += dir === 'asc' ? ' ↓' : ' ↑';
      }
    });

    const rowsArray = Array.from(this.tbody.querySelectorAll('tr'));

    rowsArray.sort((rowA, rowB) => {
      let valA = rowA.dataset[prop];
      let valB = rowB.dataset[prop];

      if (prop !== 'title') {
        valA = Number(valA);
        valB = Number(valB);
      }

      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });

    this.tbody.append(...rowsArray);
  }
}