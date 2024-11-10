export function areYouSure(callback: () => void, message = 'Are you sure you want to proceed?') {
    const isConfirmed = window.confirm(message);
    if(isConfirmed) {
        callback();
    }
}