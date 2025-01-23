import { MainDialogSkeleton } from 'features/DialogsPage/ui/dialogSkeletons/MainDialogSkeleton'
import { SideDialogsSkeleton } from 'features/DialogsPage/ui/dialogSkeletons/SideDialogsSkeleton'
import React from 'react'

export const DialogSkeleton = () => {
	return (
		<>
			<SideDialogsSkeleton />
			<MainDialogSkeleton />
		</>
	)
}

