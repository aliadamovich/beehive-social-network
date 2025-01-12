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

		return (
			<Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
			okButtonProps={{style: { backgroundColor: myTheme.colors.accentLight, color: '#fff' }}}>
			</Modal>
		)
};


