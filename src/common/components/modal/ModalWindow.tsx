import React, { useState } from 'react';
import { Modal } from 'antd';
import { myTheme } from '../../../styles/Theme';

type Props = {
	title: string
	isModalOpen: boolean
	setIsModalOpen: (isModalOpen: boolean) => void
	confirmHandler: () => void
}

export const ModalWindow = ({ title, setIsModalOpen, isModalOpen, confirmHandler }: Props) => {

		const handleOk = () => {
			setIsModalOpen(false);
			confirmHandler();
		};

		const handleCancel = () => {
			setIsModalOpen(false);
		};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter") {
			event.preventDefault(); 
			console.log(111);
			handleOk();
		}
	};

		return (
			<Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
			keyboard
			okButtonProps={{style: { backgroundColor: myTheme.colors.accentLight, color: '#fff' }}}
				afterOpenChange={(open) => {
					if (open) document.getElementById("modal-content")?.focus();
				}}
				>
				<div
					tabIndex={-1} 
					id="modal-content"
					onKeyDown={handleKeyDown} 
				></div>
			</Modal>
		)
};


