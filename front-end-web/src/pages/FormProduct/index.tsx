import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { addProduct } from '../../services/ProductApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

interface newProductData {
    name: string;
    price: string; // Altere o tipo de 'number' para 'string'
    description: string;
}

const newProductValidationSchema = zod.object({
  name: zod.string().min(2, "O nome é obrigatório"),
  price: zod.string().refine((value) => !isNaN(parseFloat(value)), "O preço deve ser um número válido"),
  description: zod.string().min(3, "A descrição é obrigatória"),
});

type Product = zod.infer<typeof newProductValidationSchema>;

export function FormProduct() {
  const newProductForm = useForm<Product>({ resolver: zodResolver(newProductValidationSchema) });
  const { handleSubmit, register, formState: { errors } } = newProductForm;
  const [loding, setLoding] = useState(false);
  const navigator = useNavigate();

  async function handleCreateProduct(data: newProductData) {
    try {
      setLoding(true);
      const response = await addProduct(data);
      if (response.status === 201) {
        navigator('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(error.response.data.message);
        }
      }
    }
    setLoding(false);
  }

  return (
    <Box>
      <Button disabled={loding} sx={{ marginTop: '1.5rem' }} onClick={() => { navigator('/'); }} variant='text'>
        <ArrowBack sx={{ fontSize: '3rem' }} />
      </Button>
      <Typography variant='h2' sx={{ textAlign: 'center', marginBottom: '2rem' }}>Formulário de Adição de produtos</Typography>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <TextField
          error={errors.name?.message ? true : false}
          helperText={errors.name?.message}
          type='text'
          sx={{ width: '85%', marginRight: '5%', marginBottom: '2rem' }}
          variant={'outlined'}
          label={'Nome'}
          {...register("name", { required: true })}
        />
        <TextField
          error={errors.price?.message ? true : false}
          helperText={errors.price?.message}
          type='text'
          sx={{ width: '10%' }}
          variant={'outlined'}
          label={'Preço'}
          {...register("price", { required: true })}
        />
        <TextField
          error={errors.description?.message ? true : false}
          helperText={errors.description?.message}
          type='text'
          variant={'outlined'}
          sx={{ marginBottom: '2rem' }}
          multiline maxRows={8}
          label={'Descrição'}
          fullWidth
          {...register("description", { required: true })}
        />
        <Button size='large' color={'success'} disabled={loding} sx={{ marginBottom: '2rem' }} variant='contained' type='submit' fullWidth>
          {loding ? 'Adicionando...' : 'Adicionar Produto'}
        </Button>
      </form>
    </Box>
  );
}
