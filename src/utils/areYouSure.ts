export function areYouSure(callback: () => void, message?: string) {
    const isConfirmed = window.confirm(message || 'Are you sure you want to proceed?');
    if(isConfirmed) {
        callback();
    }
}