import create from 'zustand';
import { persist } from 'zustand/middleware';

const store = (set, get) => ({
	nominations: [],
	addNomination: (nomination) =>
		set((state) => ({
			...state,
			nominations: [nomination, ...state.nominations],
		})),
	removeNomination: (id) =>
		set((state) => ({
			...state,
			nominations: state.nominations.filter((x) => x.imdbID != id),
		})),
	clearNominations: () => set((state) => ({ ...state, nominations: [] })),
});

const queryStore = (set) => ({
	query: '',
	sorting: '',
	setGlobalQuery: (newQuery) => set((state) => ({ ...state, query: newQuery })),
	setSorting: (newSort) => set((state) => ({ ...state, sorting: newSort })),
});

const modalStore = (set) => ({
	isOpen: false,
	imdbId: undefined,
	setOpen: (o) => set((state) => ({ ...state, isOpen: o })),
	setId: (id) => set((state) => ({ ...state, imdbId: id })),
});

export const useQueryStore = create(queryStore);
export const useStore = create(persist(store, { name: 'the-shoppies-ls' }));
export const useModalStore = create(modalStore);
