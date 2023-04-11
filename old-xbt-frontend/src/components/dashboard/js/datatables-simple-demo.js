window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        // eslint-disable-next-line no-undef
        new simpleDatatables.DataTable(datatablesSimple);
    }
});
