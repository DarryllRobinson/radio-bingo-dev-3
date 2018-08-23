const express = require('express');
const menusRouter = require('./menus.js');
const menuitemsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menusRouter.use('/:menuId/menu-items', menuitemsRouter);

menusRouter.param('menuId', (req, res, next, menuId) => {
  const sql = 'SELECT * FROM Menu WHERE Menu.id = $menuId';
  const values = {$menuId: menuId};
  db.get(sql, values, (error, menu) => {
    if (error) {
      next(error);
    } else if (menu) {
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Checks if the menuitemId provided exists, returns 404 if not
const menuitemIdCheck = (req, res, next) => {
  menuitemId = req.params.menuitemId;
  const sql = 'SELECT * FROM MenuItem WHERE MenuItem.id = $menuitemId';
  const values = {$menuitemId: menuitemId};
  db.get(sql, values, (error, menuitem) => {
    if (error) {
      next(error);
    } else if (menuitem) {
      next();
    } else {
      res.sendStatus(404);
    }
  });
};

menuitemsRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM MenuItem WHERE MenuItem.menu_id = $menuId';
  const values = { $menuId: req.params.menuId };
  db.all(sql, values, (error, menuItems) => {
    if (error) {
      next(error);
    } else {
      //console.log('menuitems: ' + JSON.stringify(menuitems));
      res.status(200).json({menuItems: menuItems});
    }
  });
});


menuitemsRouter.post('/', (req, res, next) => {
  const name = req.body.menuItem.name,
        description = req.body.menuItem.description,
        inventory = req.body.menuItem.inventory,
        price = req.body.menuItem.price,
        menuId = req.params.menuId;

  const menuSql = 'SELECT * FROM Menu WHERE Menu.id = $menuId';
  const menuValues = {$menuId: menuId};

  db.get(menuSql, menuValues, (error, menu) => {
    if (error) {
      next(error);
    } else {
      if (!name || !description || !inventory || !price || !menuId) {
        return res.sendStatus(400);
      }

      const sql = 'INSERT INTO MenuItem (name, description, inventory, price, menu_id)' +
          'VALUES ($name, $description, $inventory, $price, $menuId)';
      const values = {
        $name: name,
        $description: description,
        $inventory: inventory,
        $price: price,
        $menuId: menuId
      };

      db.run(sql, values, function(error) {
        if (error) {
          next(error);
        } else {
          db.get(`SELECT * FROM MenuItem WHERE MenuItem.id = ${this.lastID}`,
            (error, menuItem) => {
              res.status(201).json({menuItem: menuItem});
            });
        }
      });
    }
  });
});

menuitemsRouter.put('/:menuitemId', menuitemIdCheck, (req, res, next) => {
  const name = req.body.menuItem.name,
        description = req.body.menuItem.description,
        inventory = req.body.menuItem.inventory,
        price = req.body.menuItem.price,
        menuId = req.params.menuId,
        menuitemId = req.params.menuitemId;

  const menuSql = 'SELECT * FROM Menu WHERE Menu.id = $menuId';
  const menuValues = {$menuId: menuId};

  db.get(menuSql, menuValues, (error, menu) => {
    if (error) {
      next(error);
    } else {
      if (!name || !description || !inventory || !price || !menuId) {
        return res.sendStatus(400);
      }

      const sql = 'UPDATE MenuItem SET name = $name, description = $description, ' +
          'inventory = $inventory, price = $price, menu_id = $menuId ' +
          'WHERE MenuItem.id = $menuitemId';
      const values = {
        $name: name,
        $description: description,
        $inventory: inventory,
        $price: price,
        $menuId: menuId,
        $menuitemId: menuitemId
      };

      db.run(sql, values, function(error) {
        if (error) {
          next(error);
        } else {
          db.get(`SELECT * FROM MenuItem WHERE MenuItem.id = ${req.params.menuitemId}`,
            (error, menuItem) => {
              res.status(200).json({menuItem: menuItem});
            });
        }
      });
    }
  });
});

menuitemsRouter.delete('/:menuitemId', menuitemIdCheck, (req, res, next) => {
  const sql = 'DELETE FROM MenuItem WHERE MenuItem.id = $menuitemId';
  const values = {$menuitemId: req.params.menuitemId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = menuitemsRouter;
