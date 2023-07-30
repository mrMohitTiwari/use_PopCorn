import { useEffect } from "react";
export function useKey(KEY, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === KEY.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, KEY]
  );
}
