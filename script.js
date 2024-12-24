const API_KEY = '3b7512afe383e89f697619924e9c8063abb9e787'; // Thay YOUR_API_KEY bằng API Key của bạn AIzaSyAWA42C_tlRfY-OlwwUxeYh4T9__WGmLmA
const SHEET_ID = '1Kz0GxLahLLRO6YrAGtWtqARSZnqS3-heRJ41Pry-gkM'; // Thay YOUR_SHEET_ID bằng ID của Google Sheet
const SHEET_NAME = 'Sheet1!A1:C'; // Tên của sheet trong Google Sheets

document.getElementById('query').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

document.getElementById('searchBtn').addEventListener('click', search);

function search() {
    const query = document.getElementById('query').value;
    if (query) {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const rows = data.values;
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = ''; // Xóa kết quả trước đó

                if (rows) {
                    const found = rows.filter(row => row.includes(query));
                    if (found.length > 0) {
                        found.forEach(row => {
                            const p = document.createElement('p');
                            p.textContent = row.join(', ');
                            resultDiv.appendChild(p);
                        });
                    } else {
                        resultDiv.textContent = 'Không tìm thấy kết quả.';
                    }
                } else {
                    resultDiv.textContent = 'Không có dữ liệu.';
                }
            })
            .catch(error => {
                console.error('Lỗi:', error);
            });

        // Xóa dữ liệu nhập liệu
        document.getElementById('query').value = '';
    }
}
