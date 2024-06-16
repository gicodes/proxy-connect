import { Subject, type Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};

export const alertType = {
    Success: "sucess",
    Error: "error",
    Info: "info",
    Warning: "warning"
};

interface AlertOptions {
    /**
     * The status of the alert
     * @default "info"
     */
    status?: "error" | "success" | "warning" | "info" | "loading" | undefined;
  }  

const alertSubject = new Subject();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id: string = defaultId){
  return alertSubject.asObservable().pipe(
    filter((x: any | null) => x !== null && x.id === id)
  );
}

// convenience methods
function success(message: any, options: any) {
    alert({ ...options, type: alertType.Success, message });
}

function error(message: any, options: any) {
    alert({ ...options, type: alertType.Error, message });
}

function info(message: any, options: any) {
    alert({ ...options, type: alertType.Info, message });
}

function warn(message: any, options: any) {
    alert({ ...options, type: alertType.Warning, message });
}

// core alert method
function alert(alert: any) {
    alert.id = alert.id || defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
    alertSubject.next({ id });
}
