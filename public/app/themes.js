const themes = [
  // Only add new themes at the end; never delete any existing themes (they are
  // keyed by their index in the array).
  {
    name: 'Beige Land',
    propertyIndex: 0,
    displayIndex: 0,
    files: [],
    menuIconFile: 'themes/beige_land/menu_icons.png',
    emptyTile5Src: 'themes/beige_land/empty_tile5.png',
    emptyTile10Src: 'themes/beige_land/empty_tile10.png',
    fullTile10Src: 'themes/beige_land/full_tile10.png',
  },
  {
    name: 'Graph Paper (double)',
    propertyIndex: 1,
    displayIndex: 2,
    files: [
      'themes/graph_paper/style.css',
    ],
    menuIconFile: 'themes/graph_paper/menu_icons.png',
    emptyTile5Src: 'themes/graph_paper/empty_tile5.png',
    emptyTile10Src: 'themes/graph_paper/empty_tile10.png',
    fullTile10Src: 'themes/graph_paper/full_tile10.png',
  },
  {
    name: 'Gridless Flat',
    propertyIndex: 2,
    displayIndex: 3,
    files: [
      'themes/gridless_flat/style.css',
    ],
    menuIconFile: 'themes/gridless_flat/menu_icons.png',
    emptyTile5Src: 'themes/white_tile5.png',
    emptyTile10Src: 'themes/white_tile10.png',
    fullTile10Src: 'themes/gridless_flat/full_tile10.png',
  },
  {
    name: 'Cutout',
    propertyIndex: 3,
    displayIndex: 4,
    files: [
      'themes/cutout/style.css',
    ],
    menuIconFile: 'themes/cutout/menu_icons.png',
    emptyTile5Src: 'themes/cutout/empty_tile5.png',
    emptyTile10Src: 'themes/cutout/empty_tile10.png',
    fullTile10Src: 'themes/cutout/full_tile10.png',
  },
  {
    name: 'Graph Paper (single)',
    propertyIndex: 4,
    displayIndex: 1,
    files: [
      'themes/graph_paper_single/style.css',
    ],
    menuIconFile: 'themes/graph_paper_single/menu_icons.png',
    emptyTile5Src: 'themes/graph_paper_single/empty_tile5.png',
    emptyTile10Src: 'themes/graph_paper_single/empty_tile10.png',
    fullTile10Src: 'themes/graph_paper_single/full_tile10.png',
  },
  {
    name: 'Old School',
    propertyIndex: 5,
    displayIndex: 6,
    files: [
      'themes/old_school/style.css',
    ],
    menuIconFile: 'themes/old_school/menu_icons.png',
    emptyTile5Src: 'themes/old_school/empty_tile5.png',
    emptyTile10Src: 'themes/old_school/empty_tile10.png',
    fullTile10Src: 'themes/old_school/full_tile10.png',
  },
  {
    name: 'Dark',
    propertyIndex: 6,
    displayIndex: 5,
    files: [
      'themes/dark/style.css',
    ],
    menuIconFile: 'themes/dark/menu_icons.png',
    emptyTile5Src: 'themes/dark/empty_tile5.png',
    emptyTile10Src: 'themes/dark/empty_tile10.png',
    fullTile10Src: 'themes/dark/full_tile10.png',
  },
  {
    name: 'Cross Hatch (with grid)',
    propertyIndex: 7,
    displayIndex: 7,
    files: [
      'themes/cross_hatch/style_gridless.css',
      'themes/cross_hatch/grid.css',
    ],
    menuIconFile: 'themes/cross_hatch/menu_icons_grid.png',
    emptyTile5Src: 'themes/cross_hatch/empty_tile5_grid.png',
    emptyTile10Src: 'themes/cross_hatch/empty_tile10_grid.png',
  },
  {
    name: 'Cross Hatch (gridless)',
    propertyIndex: 8,
    displayIndex: 8,
    files: [
      'themes/cross_hatch/style_gridless.css',
    ],
    menuIconFile: 'themes/cross_hatch/menu_icons_gridless.png',
    emptyTile5Src: 'themes/white_tile5.png',
    emptyTile10Src: 'themes/white_tile10.png',
  },
].sort((a, b) => a.displayIndex - b.displayIndex);
