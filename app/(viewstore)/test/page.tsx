"use client";
// components/WebSocketClient.tsx
import { useEffect } from "react";

const WebSocketClient = () => {
  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.host}/api/socket`);

    socket.onopen = () => {
      console.log("WebSocket Client Connected");
      socket.send("Hello Server!");
    };

    socket.onmessage = (message) => {
      console.log(`Received: ${message.data}`);
    };

    socket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket Client</div>;
};

export default WebSocketClient;

// fetch("https://leetcode.com/accounts/login/", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundarynDGZOVfl6aWynYyA",
//     "priority": "u=1, i",
//     "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-csrftoken": "oa5wG903GAKrXARSlybCKAJk6Zxg1hH5z3hh0NLCZiv1lk8GoacRMxN0Mg4aRZkd",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "csrftoken=oa5wG903GAKrXARSlybCKAJk6Zxg1hH5z3hh0NLCZiv1lk8GoacRMxN0Mg4aRZkd; __cf_bm=bCveZHTp9sbIdqSGCOJMLFkNc3xdX_914ktDlApNbH4-1718689043-1.0.1.1-HGB7WkxPNiWGkcob7yJJCvJvMQVIs1zMGNJE4eRUw0Rw7cVRfsTh5msx96BcZXkxv8wyak996RfGK5e8MOELyA; _gid=GA1.2.777735972.1718689046; gr_user_id=16b8c687-e59e-4bd6-a82d-b2f713b91aca; 87b5a3c3f1a55520_gr_session_id=b3477321-65ab-49f1-99d9-6eeb833aae29; 87b5a3c3f1a55520_gr_session_id_sent_vst=b3477321-65ab-49f1-99d9-6eeb833aae29; _ga=GA1.1.290370273.1718689045; _ga_CDRWKZTDEX=GS1.1.1718689044.1.1.1718689104.60.0.0; cf_clearance=xZ32shfxfWGPsCnAvXwRVDyisia44F5nby57SZPpOVo-1718689127-1.0.1.1-HtupfKK.eOhzNs3H4xh_RItq0zRkJiFwpdR0cRnFIK9oTlS.THFEBqvvLMK_KjMqLbM_UW7LqIKlcUSB1ovM7w; _dd_s=rum=0&expire=1718690031912",
//     "Referer": "https://leetcode.com/accounts/signup/",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "------WebKitFormBoundarynDGZOVfl6aWynYyA\r\nContent-Disposition: form-data; name=\"csrfmiddlewaretoken\"\r\n\r\noa5wG903GAKrXARSlybCKAJk6Zxg1hH5z3hh0NLCZiv1lk8GoacRMxN0Mg4aRZkd\r\n------WebKitFormBoundarynDGZOVfl6aWynYyA\r\nContent-Disposition: form-data; name=\"login\"\r\n\r\nkamal7643\r\n------WebKitFormBoundarynDGZOVfl6aWynYyA\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nDob$7643\r\n------WebKitFormBoundarynDGZOVfl6aWynYyA\r\nContent-Disposition: form-data; name=\"next\"\r\n\r\n/\r\n------WebKitFormBoundarynDGZOVfl6aWynYyA\r\nContent-Disposition: form-data; name=\"cf_turnstile_token\"\r\n\r\n0.eAWGHSBDvsa8g2OIrMopY-D_UM4blbVZHL9u4Yt5uLTdseELv85s_GDBJ3AGnC4WLvsmvM4C-0lHSMYjOOx92EvZIbhIIrqVl2byIcCKXeDdiYTs4Nran3ubQvu5aUZf14ta0tFmm8Ke4J68RglGUnDDcFEz_pvtwj9A9x9cBqd0SaH3HjfvkjdHvDvKem5JMKhNONY1-xkFWie0pwLX5fJb4kRt3UILsQrNqBMzJcKBH5Za771ddnkWJ5IFf0ox6lEEH-OCYnh08Pg-13B_sEN1cqJJRuPlkTTxMQR5BCrJHkRHPxb4y7_zW61113A69gEiSXdHME7ghF0v5iHSPMl4wwv1uu9_Y-Bdkq3vGksw1EnSGf4YvRMw8L77tygya50qtUUrOR4C6X_rgYJnEldtkoSn1PecsGIOEzSm-48.EZ5VMXvJs-I_F1uXAGazDg.b97aafdcadc548e1a2821b7b649cd99030b22a3bc717d75d296264df6c1cdcbb\r\n------WebKitFormBoundarynDGZOVfl6aWynYyA--\r\n",
//   "method": "POST"
// });
