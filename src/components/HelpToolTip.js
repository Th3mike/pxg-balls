import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa"; // Ícone de ?

const HelpModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      {/* Ícone de ajuda */}
      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-400"
      >
        <FaQuestionCircle size={24} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4">Ajuda</h2>
            <p className="text-lg mb-6">
              Os valores não são exatos pois a equipe PXG não divulga a fórmula,
              isso é baseado no valor de compra de cada ball do Mark.
            </p>
            {/* Botão de fechar sem fundo */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-white"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpModal;
