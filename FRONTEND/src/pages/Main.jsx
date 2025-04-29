import InfiniteMenu from '../components/InfiniteMenu'

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'MERN',
    description: 'SWIPE ->'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'DESIGNER',
    description: 'SWIPE ->'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'REACT',
    description: 'SWIPE ->'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'FULL STACK',
    description: 'SWIPE ->'
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>