from http.server import BaseHTTPRequestHandler, HTTPServer
import json
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body=json.dumps({'status':'ok'} if self.path in ('/health','/ready') else {'error':'not found'}).encode()
        self.send_response(200 if self.path in ('/health','/ready') else 404)
        self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(body)))
        self.send_header('X-Content-Type-Options','nosniff');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
if __name__=='__main__':HTTPServer(('0.0.0.0',8080),Handler).serve_forever()
