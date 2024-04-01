import { create } from 'zustand';


export const countStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export const selectedItemsStore = create((set) => ({
    selected: [],
    count: 0,
    select: (item) => set((state) => ({
        selected: [...state.selected, item],
        count: state.selected.length + 1
    }))
}))
export const formStore = create((set) => ({
    file: null,
    name: '',
    description: '',
    price: '',
    password: '',
    setFile: (file) => set({ file }),
    setName: (name) => set({ name }),
    setDescription: (description) => set({ description }),
    setPrice: (price) => set({ price }),
    setPassword: (password) => set({ password })
}));





