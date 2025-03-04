const items = [
    { name: "pulpen", price: 3000 },
    { name: "pensil", price: 2000 },
    { name: "buku tulis", price: 6000},
    { name: "scarpbook", price: 17000 },
    { name: "spidol", price: 8000 },
    { name: "tinta spidol", price: 25000 },
    { name: "pensil warna", price: 30000 },
    { name: "cat air", price: 19000 },
    { name: "sampul buku plastik", price: 1000 },
    { name: "sampul buku kertas", price: 1200 }
];
let totalHargaSemuaBarang = 0;

document.getElementById('addItemButton').addEventListener('click', function() {
    addItem();
});

document.getElementById('printButton').addEventListener('click', function() {
    printReceipt();
});

function addItem() {
    const itemSelect = document.getElementById('item');
    const quantityInput = document.getElementById('quantity');
    const discountInput = document.getElementById('discount');

    const selectedItemIndex = itemSelect.value;
    const quantity = parseInt(quantityInput.value);
    const discount = parseFloat(discountInput.value);

    if (selectedItemIndex === "") {
        alert("Silakan pilih barang terlebih dahulu!");
        return;
    }
    if (quantity <= 0) {
        alert("Jumlah barang harus lebih dari 0!");
        return;
    }
    if (discount < 0 || discount > 100) {
        alert("Diskon harus antara 0 hingga 100!");
        return;
    }

    const selectedItem = items[selectedItemIndex];
    const itemPrice = selectedItem.price;
    const totalPrice = itemPrice * quantity;
    const discountAmount = (discount / 100) * totalPrice;
    const priceAfterDiscount = totalPrice - discountAmount;

    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const row = tbody.insertRow();
    const rowIndex = tbody.rows.length;
    row.innerHTML = `
        <td>${rowIndex}</td>
        <td>${selectedItem.name}</td>
        <td>Rp ${itemPrice.toLocaleString()}</td>
        <td>${quantity}</td>
        <td>Rp ${totalPrice.toLocaleString()}</td>
        <td>${discount}%</td>
        <td>Rp ${discountAmount.toLocaleString()}</td>
        <td>Rp${priceAfterDiscount.toLocaleString()}</td>
        <td><button class="deleteButton no-print" onclick="deleteItem(this, ${priceAfterDiscount})">Hapus</button></td>`;  // Menambahkan kelas 'no-print' pada tombol Hapus

    totalHargaSemuaBarang += priceAfterDiscount;
    document.getElementById('totalAll').textContent = `Rp ${totalHargaSemuaBarang.toLocaleString()}`;
    itemSelect.value = "";
    quantityInput.value = 1;
    discountInput.value = 0;
}

function deleteItem(button, priceAfterDiscount) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    totalHargaSemuaBarang -= priceAfterDiscount;
    document.getElementById('totalAll').textContent = `USD ${totalHargaSemuaBarang.toLocaleString()}`;
}

function printReceipt() {
    const thanksMessage = document.querySelector('.thanks-message');

    // Sembunyikan elemen sebelum cetak
    thanksMessage.style.display = 'none';
    document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');

    // Cetak struk
    window.print();

    // Setelah struk dicetak, tampilkan pesan "Terima Kasih semoga datang kembali lagii!"
    thanksMessage.style.display = 'block';

    // Kembalikan elemen no-print agar bisa digunakan lagi
    document.querySelectorAll('.no-print').forEach(el => el.style.display = 'block');
}
