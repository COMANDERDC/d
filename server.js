const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;//Port jako zmienna srodowiskowa

const server = http.createServer((req,res) => {
    const currentDate = new Date().toLocaleString();
    const authorName = process.env.AUTHOR_NAME || "Jakub Smyrski";//Dane autora jako zmienna srodowiskowa
    const clientIP = req.connection.remoteAddress;

    const logMessage = `Serwer uruchomiony przez ${authorName} na porcie ${PORT} o ${currentDate}. Adres IP klienta -> ${clientIP}\n`;
    fs.appendFile('server.log',logMessage,(err) => {
        if (err) throw err;
    console.log('Log wczytany do pliku server.log');
});

    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(`<h1>Hello!</h1>`);
    res.write(`<p>Your IP address ${clientIP}</p>`);
    const clientDateTime = new Date().toLocaleString('pl-PL',{timeZone: 'Europe/Warsaw'});
    res.write(`<p>Aktualna data i godzina w Twojej strefie czasowej -> ${clientDateTime}</p>`);
    res.end();
});

server.listen(PORT,() => {
    const currentDate = new Date().toLocaleString();
    const authorName = process.env.AUTHOR_NAME || "Jakub Smyrski";
    console.log(`Serwer uruchomiony przez ${authorName} na porcie ${PORT} o ${currentDate}`);
});
