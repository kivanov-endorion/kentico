<script>
// Save as image
    $('body').on('click', '.btn-capture', () => {
        html2canvas(document.querySelector('.floor')).then(canvas => {

            let title = document.querySelector('h1').textContent;
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', title);
            canvas.toBlob(function (blob) {
                let url = URL.createObjectURL(blob);
                downloadLink.setAttribute('href', url);
                downloadLink.click();
            });
        });
    })
</script>
