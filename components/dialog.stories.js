import Dialog from './dialog'

export default {
  title: 'Grocery/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
  },
}

const ingredients = `Beef shank, 250 g\n` +
  `Cabbage, 1/2 head\n` +
  `Potato, 2 pcs\n` +
  `Carrot, 1 pc\n` +
  `Onion, 1 pc\n`

const items = ingredients.split('\n').filter((item) => item.length > 0)

export const Primary = {
  args: {
    items,
  },
}
