import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface AlertDeleteProps {
  Open: boolean; // Altere o nome da propriedade para 'open'
  onClose: () => void; 
  deleteProduct: () => void; 
}

export default function AlertDelete({ Open, onClose, deleteProduct }: AlertDeleteProps) {
  const handleClose = () => {
    onClose(); // Chame a função 'onClose' para fechar o diálogo
  };
  function Confirm(){
    onClose();
    deleteProduct();
  }

  return (
    <div>
      <Dialog
        open={Open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Deleção do produto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja deletar o produto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={Confirm} color="primary">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
