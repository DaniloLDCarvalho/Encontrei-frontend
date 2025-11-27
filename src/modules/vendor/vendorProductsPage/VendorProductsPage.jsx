import React, {useState} from 'react';
import { ArrowLeft, Edit2, Plus, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductListItem } from "@/components/shared/ProductListItem";
import { useNavigate } from "react-router-dom";
import { useProductsData } from "@/hooks/products/useProductsData";
import {productService} from "@/services/productService";
import './VendorProductsPage.css'

const VendorActions = ({ onEdit, onDelete }) => (
    <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onEdit} className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full h-9 w-9">
            <Edit2 className="w-5 h-5" strokeWidth={1.5} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full h-9 w-9">
            <Trash2 className="w-5 h-5" strokeWidth={1.5} />
        </Button>
    </div>
);

const VendorProductsPage = () => {
    const { isLoading, isError, data, refetch } = useProductsData();
    const navigate = useNavigate();

    const [showDeleteModal , setShowDeleteModal ] = useState(false);
    const [deletedProductId, setDeletedProductId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeletedProductId(id)
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await productService.deleteProduct(Number(deletedProductId));

            setDeletedProductId(null)
            setShowDeleteModal(false);

            if (refetch) await refetch();

        } catch (error) {
            console.error("Erro ao deletar", error);
            alert("Erro ao excluir produto.");
            setShowDeleteModal(false);
        }
    };

    const handleEdit = (id) => navigate(`/product/edit/${id}`);

    if (isLoading) return <div className="p-8 text-center">Carregando seus produtos...</div>;
    if (isError || !data) return <div className="p-8 text-center text-red-500">Erro ao carregar estoque.</div>;

    const products = data.products || [];

    return (
        <div className="min-h-screen bg-[#f6f7fb] pb-24 font-sans">
            <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white shadow-md">
                <div className="px-4 py-4 flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full -ml-2"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="w-6 h-6"/>
                    </Button>
                    <h1 className="text-xl font-bold tracking-tight">Meus Produtos</h1>
                </div>
            </header>

            <main className="pt-20 p-4 space-y-3 w-full max-w-3xl mx-auto">
                {products.length === 0 && (
                    <div className="text-center text-gray-400 mt-10">
                        Você ainda não tem produtos cadastrados.
                    </div>
                )}

                {products.map((product) => (
                    <ProductListItem
                        key={product.id}
                        product={product}
                        onClick={null}
                        actions={
                            <VendorActions
                                onEdit={() => handleEdit(product.id)}
                                onDelete={() => handleDeleteClick(product.id)}
                            />
                        }
                        extraInfo={`Estoque: ${product.stock || 0}`}
                    />
                ))}
            </main>

            <div className="fixed bottom-6 right-6 z-30">
                <Button
                    className="h-14 w-14 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                    onClick={() => navigate('/product/new')}
                >
                    <Plus className="w-7 h-7" strokeWidth={2.5}/>
                </Button>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="alert-icon-bg">
                            <AlertTriangle size={40} color="#ef4444" strokeWidth={2.5} />
                        </div>

                        <h3 className="modal-title">Excluir Produto?</h3>

                        <p className="modal-message">
                            Tem certeza que deseja excluir este item>
                            <br/>Essa ação não pode ser desfeita.
                        </p>

                        <div className="modal-actions">
                            <button
                                className="btn-modal-cancel"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="btn-modal-delete"
                                onClick={confirmDelete}
                            >
                                <Trash2 size={18} />
                                Sim, Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorProductsPage;