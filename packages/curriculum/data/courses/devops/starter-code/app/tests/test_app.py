import unittest, threading, urllib.request, urllib.error, json
from http.server import HTTPServer
from app import Handler
class APITest(unittest.TestCase):
    def test_health(self):
        server=HTTPServer(('127.0.0.1',0),Handler);thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
        try:
            base=f'http://127.0.0.1:{server.server_port}'
            with urllib.request.urlopen(base+'/health',timeout=3) as response:self.assertEqual(json.load(response),{'status':'ok'})
            with self.assertRaises(urllib.error.HTTPError) as e:urllib.request.urlopen(base+'/missing',timeout=3)
            self.assertEqual(e.exception.code,404)
        finally:server.shutdown();thread.join();server.server_close()
