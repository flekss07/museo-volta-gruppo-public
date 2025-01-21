import http.server
import socketserver
import json

PORT = 8080 # port  del server

class requestHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        print(f"Received OPTIONS request for: {self.path}")
        
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Max-Age', '86400')
        self.end_headers()
        
    # funzione per impostare gli header per le risposte
    def set_headers(self,cont_type = 'application/json',code = 200):
        self.send_response(code) # codice risposta, di default 200
        self.send_header('Content-Type',cont_type)
        self.end_headers()

    # funzione che si occupa di recuperare e fare il parse dei dati inviati dal cilent per il post
    def data_parser(self):
        content_length = int(self.headers['Content-Length']) # recupera la lunghezza dei contenuti inviati tramite header
        data = self.rfile.read(content_length) # legge i dati nel canale di comunicazione in base alla lunghezza del content passato
        parsed_data = json.loads(data.decode('utf-8')) # fa il parse dei dati mandati in formato json caricandoli in formato utf-8
        print(f'recieved data: {parsed_data}') # fa un log dei dati a console per debugging
        return parsed_data # fa il return dei dati
    
    
    def do_GET(self):
        print(f"Received GET request for: {self.path}")
        
        if self.path in ['/','']: # imposta il path dell'index
            self.path = '/front-end/index.html'
            return super().do_GET()
        
        elif self.path == '/test': # risposta richiesta get con url = /test
            self.test_get()
            
        elif self.path == '/client': # imposta il path del client
            self.path = '/front-end/client.js'
            return super().do_GET()
            
        else:
            return super().do_GET()

    def test_get(self):
        self.set_headers()
        response = {'text':'funziona'}
        self.wfile.write(json.dumps(response).encode('utf-8'))
        

def run_server(port=PORT,handler=requestHandler):
    server_address = ('',port)
    httpd = socketserver.TCPServer(server_address,handler)
    print(f'server running on port: {port}') # stampa su che porta il server sta funzionando
    httpd.serve_forever() # imposta il server per non scadere mai mantenendolo sempre attivo
    
if __name__ == '__main__':
    run_server()