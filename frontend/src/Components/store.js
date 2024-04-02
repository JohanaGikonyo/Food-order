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
// export const formStore = create((set) => ({
//     file: null,
//     name: '',
//     description: '',
//     price: null,
//     password: null,
//     setFile: (file) => set({ file }), // Should be set({ file }) instead of set({ file: file })
//     setName: (name) => set({ name }), // Should be set({ name }) instead of set({ name: name })
//     setDescription: (description) => set({ description }), // Should be set({ description }) instead of set({ description: description })
//     setPrice: (price) => set({ price }), // Should be set({ price }) instead of set({ price: price })
//     setPassword: (password) => set({ password }) // Should be set({ password }) instead of set({ password: password })
// }));






