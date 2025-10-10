import Swal from 'sweetalert2';

const swal = {
  toast: ({
    position = 'top-end',
    icon = null,
    title = null,
    timer = 3000,
  }: {
    position?: 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start';
    icon?: 'success' | 'error' | 'info' | 'warning' | 'question' | null;
    title?: string | null;
    timer?: number;
  }) => {
    Swal.fire({
      toast: true,
      position,
      icon: icon ?? undefined,
      title: title ?? undefined,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      width: 'auto',
      customClass: {
        popup: 'bg-neutral-800 text-neutral-200'
      }
    });
  },
};

export { swal };
