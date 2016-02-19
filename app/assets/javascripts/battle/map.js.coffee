mapReady = ->
  element  = document.getElementById('hexagon')

  if element
    stage   = new createjs.Stage('hexagon')

    viewScale = 0.1

    stage.x = element.width / 2
    stage.y = element.height / 2
    stage.scaleX = viewScale
    stage.scaleY = viewScale

    stageTransformer = new StageTransformer
    stageTransformer.initialize
      element: element
      stage: stage
      maxScaleX: viewScale
      maxScaleY: viewScale
      minScaleX: viewScale
      minScaleY: viewScale

    grid             = new Hex.Grid()
    grid.tileSize    = 100
    grid.tileSpacing = 20
    grid.pointyTiles = false

    stageTransformer.addEventListeners()

    coordinates = grid.hexagon(0, 0, 10, true)

    for coordinate in coordinates
      q = coordinate.q
      r = coordinate.r
      center = grid.getCenterXY(q, r)
      hexagon = new createjs.Shape()

      hexagon.graphics
        .beginFill('rgba(150,150,150,1)')
        .beginStroke('rgba(50,50,50,1)')
        .drawPolyStar(0, 0, grid.tileSize, 6, 0, 0)

      hexagon.q = q;
      hexagon.r = r;
      hexagon.x = center.x;
      hexagon.y = center.y;

      hexagon.addEventListener 'click', (event) ->
        if !stageTransformer.mouse.moved
          event.target.graphics
            .clear()
            .beginFill('rgba(0,150,0,1)')
            .beginStroke('rgba(50,0,0,1)')
            .drawPolyStar(0, 0, grid.tileSize, 6, 0, 0)

      hexagon.addEventListener 'mouseenter', (event) ->
        debugger

      stage.addChild(hexagon)

    tick = (event) ->
      stage.update()

    tick

    createjs.Ticker.setFPS(60)
    createjs.Ticker.addEventListener("tick", tick)

$(document).ready(mapReady)
$(document).on('page:load', mapReady)
