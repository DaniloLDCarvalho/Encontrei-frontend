import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getCategoryIcon} from "@/lib/productCategoryIconMapper";
import {productService} from "@/services/productService";
import {productSchema} from "@/types/product/productSchema";
import { Save, Trash2, ArrowLeft, CheckCircle2} from "lucide-react";
import Button from "@/components/ui/button";
import './ProductFormPage.css';
import {useProductsData} from "@/hooks/products/useProductsData";



const CATEGORIES = [
    "Vestido", "Blusa", "Calça", "Saia", "Short",
    "Conjunto", "Calçados", "Bolsas", "Acessórios", "Outros"
];

const ProductFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, refetch } = useProductsData()

    const product = data.products.find(product => product.id === Number(id))

    const isEditMode = !!id;

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            id: undefined,
            storeId: undefined,
            name: '',
            category: '',
            price: 0,
            stock: 0,
            sizes: '',
            colors: ''
        }
    });

    const currentCategory = useWatch({ control, name: 'category' });
    const CategoryIcon = getCategoryIcon(currentCategory);

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if(isEditMode && product ) {
            reset({
                id: product.id,
                storeId: product.storeId,
                name: product.name,
                price: product.price,
                category: product.category,
                stock: product.stock,
                sizes: product.sizes,
                colors: product.colors,
            });
        }
    }, [isEditMode, id, product, reset]);

    const onSubmit = async (formData) => {
        try {


            const payload = {
                ...formData,
                id: isEditMode ? formData.id : undefined,
                storeId: isEditMode ? formData.storeId : 1,
            }

            if (isEditMode) {
                console.log("Updating product: ", payload);
                await productService.updateProduct(Number(id), payload);
            } else {
                console.log("Form Data Submitted: ", formData);
                await productService.createProduct(payload);
            }
            if (refetch) await refetch();
            setShowToast(true)
            setTimeout(() => {
                navigate('/vendor/products')
            }, 1500)
        } catch (error) {
            alert("Erro ao salvar.");
        }
    }

    return (
        <div className="min-h-screen bg-[#f6f7fb] font-sans">
            <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white shadow-md">
                <div className="px-4 py-4 flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full -ml-2" onClick={() => navigate("/vendor/products")}>
                        <ArrowLeft className="w-6 h-6"/>
                    </Button>
                    <h1 className="text-xl font-bold tracking-tight">
                        {isEditMode ? "Editar Produto" : "Novo Produto"}
                    </h1>
                </div>
            </header>

            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

                <div className="image-preview-container">
                    <div className="text-purple-600 mb-2">
                        <CategoryIcon size={48} />
                    </div>
                    <span className="preview-text">Ícone: {currentCategory}</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Nome do Produto</label>
                    <input
                        {...register("name")}
                        className={`form-input ${errors.name ? 'border-red-500 focus:shadow-red-100' : ''}`}
                        placeholder="Ex: Vestido Longo"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <div className="form-group">
                            <label className="form-label">Preço (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price")}
                                className={`form-input ${errors.price ? 'border-red-500' : ''}`}
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-group">
                            <label className="form-label">Estoque</label>
                            <input
                                type="number"
                                {...register("stock")}
                                className={`form-input ${errors.stock ? 'border-red-500' : ''}`}
                            />
                            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Categoria</label>
                    <select {...register("category")} className="form-select">
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <div className="form-group">
                            <label className="form-label">Tamanhos</label>
                            <input {...register("sizes")} className="form-input" placeholder="Ex: P, M, G" />
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-group">
                            <label className="form-label">Cores</label>
                            <input {...register("colors")} className="form-input" placeholder="Ex: Azul" />
                        </div>
                    </div>
                </div>

                <div className="save-bar">
                    <button type="submit" className="btn-save" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : (
                            <>
                                <Save size={20} />
                                {isEditMode ? "Salvar Alterações" : "Criar Produto"}
                            </>
                        )}
                    </button>
                </div>
            </form>
            {showToast && (
                <div className="toast-overlay">
                    <div className="toast-content">
                        <CheckCircle2 size={24} color="#4ade80" />
                        <p className="toast-message">
                            {isEditMode ? "Produto atualizado!" : "Produto criado com sucesso!"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFormPage;