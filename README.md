# Battle Pop of Gravity

## 玩法

- 人机/双人对战，每个玩家占有一半的格子，并有盾条和血条。

- 回合轮换制，本回合玩家可以在自己的半场选择两个格子交换，可交换的格子符合三消规则。

- 本回合玩家交换格子后，格子按照三消规则消除，消除的格子按属性给出伤害、治疗或防御。

- 重力向着本回合玩家的方向。格子消除后，会向本回合玩家的方向下落。

- 每个玩家有15s的思考时间，超时则直接进入下一回合。

- 有一方玩家血量归零，则游戏结束。

## 玩家属性

- 血量：初始xxx，血量归零则游戏结束。

- 护盾量（防御值）：初始xxx，可防御物理攻击，无法防御魔法攻击。护盾值归零则开始扣血。

## 格子属性

- 爱心：回复血量。

- 盾牌：增加护盾量。

- 剑：对敌方造成物理伤害。

- 闪电：对敌方造成魔法伤害。

- 星星：待定。

## 三消规则

- 横向或纵向连续三个格子相同，则消除。

- 横向或纵向连续四个格子相同，或一个格子的横向和纵向同时都有三个格子相同，消除后会在原位合成一个超级方块。

- 超级方块消除时，会有x%的效果增加。

## 可增加功能

- 星星格子的效果。

- 道具

- 动态调整掉率

- 超级方块种类（功能方块）

- 在线联机

- AI策略

- 大招动画

- 人物选择

## 核心算法

核心算法在`src/myxiaoxiaole`下。
以下讲解来自copilot。

### Game.java

这个文件定义了一个 `Game` 类，它继承了 `javafx.application.Application` 类，这意味着这个类是一个 JavaFX 应用程序。

在 `Game` 类中，定义了两个方法：

1. `main` 方法：这是 Java 程序的入口点。它调用了 `launch(args)` 方法来启动 JavaFX 应用程序。

2. `start` 方法：这是 JavaFX 应用程序的主要入口点。在这个方法中，创建了一个 `StackPane`（一个可以将其子节点堆叠在垂直列中的容器），然后创建了一个 `Scene`（包含可视化内容的图形容器）并将 `StackPane` 添加到其中。然后，创建了一个 `MenuPanel` 对象并将其添加到 `StackPane` 中。最后，将 `Scene` 设置为舞台（`Stage`）的场景，并显示舞台。

### GamePanel.java

这个 `GamePanel.java` 文件定义了一个名为 `GamePanel` 的类，它继承了 `javafx.scene.layout.Pane` 类。这个类是游戏的主要面板，它包含了游戏的主要逻辑和界面元素。

以下是这个类的主要部分：

1. **变量定义**：定义了一些常量，如 `WIDTH`，`HEIGHT`，`OFFSET_HEIGHT` 和 `ROUND_TIME`，以及一些属性，如 `layerOnProperty`，`EndGameProperty` 和 `clock`。还定义了一些界面元素，如 `gridPanel`，`playerA`，`playerB`，`btQuit`，`btContinue` 和 `lblTime`。

2. **构造函数**：在构造函数中，设置了面板的大小和背景，创建了 `GridPanel` 和两个 `PlayerPanel` 对象，设置了它们的位置，添加了一个 "menu" 按钮，并设置了其动作。然后，创建了一个暂停面板，包含 "Continue" 和 "Quit" 按钮，并设置了它们的动作。最后，创建了一个计时器，每秒更新一次 `clock` 属性。

3. **动作处理方法**：`processActions` 方法根据动作编号执行不同的动作，如物理攻击，增加防御，魔法攻击，增加生命值等。这些动作都返回一个 `Timeline` 对象，表示动作的动画。

4. **动作动画方法**：`physicalAttack`，`increaseAC`，`magicAttack` 和 `increaseHP` 方法都创建了一个 `Timeline` 对象，表示动作的动画。这些方法都会修改玩家的生命值或防御值，并显示一个标签来表示动作的效果。

5. **标签动画方法**：`animateLbl` 方法创建了一个 `Timeline` 对象，表示标签的动画。这个方法创建了一个 `attackLabel` 对象，设置了其样式和位置，然后创建了一个动画来显示这个标签。

这个类的核心算法主要在 `processActions` 方法和动作动画方法中。`processActions` 方法根据动作编号执行不同的动作，动作动画方法则创建了表示动作的动画，并修改了玩家的属性。

### GridPanel.java

这个 `GridPanel.java` 文件定义了一个名为 `GridPanel` 的类，它继承了 `javafx.scene.layout.Pane` 类。这个类是游戏的主要面板，它包含了游戏的主要逻辑和界面元素。

以下是这个类的主要部分：

1. **变量定义**：定义了一些常量，如 `CELL_SIZE`，`CELL_X`，`CELL_Y`，`GRIDPANEL_WIDTH` 和 `GRIDPANEL_HEIGHT`，以及一些属性，如 `gamePanel`，`grid`，`selected`，`inAnimation`，`jewelsToBeDeleted`，`AsTurn` 和 `currentAnimation`。

2. **构造函数**：在构造函数中，设置了面板的大小和位置，创建了一个 `Jewel` 的二维数组 `grid`，并为每个 `Jewel` 对象设置了鼠标点击事件。

3. **创建宝石方法**：`createJewel` 方法创建了一个新的 `Jewel` 对象，设置了其位置和鼠标点击事件。

4. **结束一轮方法**：`endOneLoop` 方法将 `inAnimation` 设置为 `false`，`currentAnimation` 设置为 `null`，`selected` 设置为 `null`，并切换 `AsTurn` 的值。然后，根据 `AsTurn` 的值设置背景图片，重置计时器，并根据游戏级别决定是否执行 AI 动作。

5. **判断是否相邻方法**：`isAdjacent` 方法判断两个 `Jewel` 对象是否相邻。

6. **开始动作方法**：`startAction` 方法开始一个动作，包括交换两个 `Jewel` 对象的位置，检查是否需要删除宝石，以及删除宝石。

7. **交换位置方法**：`interchange` 方法交换两个 `Jewel` 对象的位置。

8. **移动方法**：`move` 方法移动一个 `Jewel` 对象到指定的位置。

9. **检查删除方法**：`checkDeleteWhileInitializing` 和 `checkDeleteAndMark` 方法检查是否有三个或更多相同颜色的 `Jewel` 对象在一行或一列中，如果有，则标记它们为待删除。


这个类的核心算法主要在 `startAction`，`interchange`，`move` 和 `checkDeleteAndMark` 方法中。`startAction` 方法开始一个动作，`interchange` 和 `move` 方法负责动画效果，`checkDeleteAndMark` 方法负责游戏逻辑。

这个 `GridPanel.java` 文件的剩余部分主要包含以下方法：

1. **获取宝石方法**：`getGrid` 方法根据给定的坐标返回对应的 `Jewel` 对象。如果坐标超出了宝石网格的范围，它将返回一个新的 `Jewel` 对象。

2. **删除方法**：`delete` 方法负责删除被标记为待删除的宝石，并创建新的宝石来填充空位。它还创建了一个动画来显示宝石的移动和消失。

3. **准备攻击方法**：`prepareAttack` 方法创建了一个动画来显示宝石的攻击准备动作。如果宝石的颜色是4，所有的宝石都会消失。否则，所有的宝石都会向一个随机选定的宝石移动。

4. **攻击方法**：`attack` 方法创建了一个动画来显示宝石的攻击动作。它根据宝石的颜色和状态选择不同的攻击动画，并调用 `gamePanel.processActions` 方法来处理攻击的效果。

5. **物理攻击方法**：`physicalAttack` 方法创建了一个动画来显示宝石的物理攻击动作。宝石会沿着一条线移动到目标位置，并在移动过程中逐渐缩小。

6. **魔法攻击方法**：`magicAttack` 方法创建了一个动画来显示宝石的魔法攻击动作。宝石会沿着一条曲线移动到目标位置。

7. **补给动画方法**：`supplyAnimation` 方法创建了一个动画来显示宝石的补给动作。宝石会逐渐放大并消失。

8. **AI动作方法**：`AIAction` 方法让AI选择一个可以交换的宝石对，并开始交换动作。如果没有可以交换的宝石对，AI会随机选择一个宝石对进行交换。

9. **显示待删除宝石方法**：`showJewelsToBeDeleted` 方法是一个测试方法，用于打印出所有待删除的宝石的坐标。

10. **消失动画方法**：`vanish` 方法创建了一个动画来显示宝石的消失动作。宝石会逐渐变透明并从面板中移除。

这些方法主要负责游戏的动画效果和AI的行为。`delete`，`prepareAttack`，`attack`，`physicalAttack`，`magicAttack` 和 `supplyAnimation` 方法创建了各种动画效果，`AIAction` 方法则负责AI的行为。

在这段代码中，可能存在的问题包括：

1. **并发修改异常**：在 `for-each` 循环中，如果你试图在遍历 `jewelsToBeDeleted` 或 `list` 的同时修改它们，将会抛出 `ConcurrentModificationException`。确保在遍历过程中不修改这些集合，或者使用迭代器进行安全的并发修改。

2. **空指针异常**：如果 `jewelsToBeDeleted` 或 `list` 中的任何一个元素是 `null`，或者 `jewel` 是 `null`，将会抛出 `NullPointerException`。在使用这些对象之前，应该检查它们是否为 `null`。

3. **数组越界异常**：如果 `jewel.getLayoutX() / CELL_SIZE` 或 `jewel.getLayoutY() / CELL_SIZE` 的结果不是有效的数组索引，将会抛出 `ArrayIndexOutOfBoundsException`。应该确保这些值在数组的范围内。

4. **动画未正确结束**：如果 `vanish` 方法的 `Timeline` 对象未能正确结束，`setOnFinished` 中的代码可能不会执行。这可能是由于动画被中断或其他原因。应该确保动画总是能正确结束。

请注意，这些只是可能的问题，实际的问题可能会根据代码的其他部分和运行环境有所不同。

### Jewel.java

这个 `Jewel.java` 文件定义了一个名为 `Jewel` 的类，它继承了 `javafx.scene.layout.Pane` 类。这个类表示游戏中的一个宝石。

以下是这个类的主要部分：

1. **变量定义**：定义了一些常量，如 `color`，`size`，`TYPE`，`status` 和 `toBeDelete`。`color` 表示宝石的颜色，`size` 表示宝石的大小，`TYPE` 表示宝石的类型数量，`status` 表示宝石的状态，`toBeDelete` 表示宝石是否被标记为待删除。

2. **构造函数**：在构造函数中，设置了宝石的颜色，大小和位置，并选择了宝石的图片。

3. **设置位置方法**：`setLocation` 方法设置了宝石的位置。

4. **获取网格坐标方法**：`getGridX` 和 `getGridY` 方法返回宝石在网格中的坐标。

5. **状态获取和设置方法**：`getStatus` 和 `setStatus` 方法获取和设置宝石的状态。

6. **颜色比较方法**：`isSameColor` 方法比较两个宝石是否有相同的颜色。

7. **选择图片方法**：`selectImage` 方法根据宝石的颜色选择宝石的图片。

8. **待删除状态获取和设置方法**：`isToBeDelete` 和 `setToBeDelete` 方法获取和设置宝石的待删除状态。

9. **颜色获取方法**：`getColor` 方法返回宝石的颜色。

10. **是否为攻击宝石方法**：`isAttackJewel` 方法判断宝石是否为攻击宝石。

11. **是否相同颜色方法**：`isSameColor` 方法判断一组宝石是否有相同的颜色。

12. **是否待删除方法**：`isToBeDelete` 方法判断一组宝石是否都被标记为待删除。

13. **设置待删除状态方法**：`setToBeDelete` 方法设置一组宝石的待删除状态。

这个类的核心算法主要在 `isSameColor`，`isToBeDelete` 和 `setToBeDelete` 方法中。这些方法负责处理宝石的颜色和待删除状态，这是消消乐游戏的核心逻辑。

### PlayerPanel.java

这个 `PlayerPanel.java` 文件定义了一个名为 `PlayerPanel` 的类，它继承了 `javafx.scene.layout.Pane` 类。这个类主要负责创建和管理游戏中的玩家面板，包括显示玩家的血量（HP）和攻击力（AC），以及玩家的英雄角色。

以下是这个类的主要部分：

1. **变量定义**：定义了一些 `Label` 对象，如 `lblHPPoint` 和 `lblACPoint`，用于显示玩家的血量和攻击力。定义了一个 `Heroes` 对象 `heroA`，用于显示玩家的英雄角色。定义了两个 `IntegerProperty` 对象 `HPProperty` 和 `ACProperty`，用于存储玩家的血量和攻击力。

2. **构造函数**：在构造函数中，设置了面板的大小，创建了血量和攻击力的标签和矩形条，设置了它们的样式，位置和大小。然后，为 `HPProperty` 和 `ACProperty` 添加了监听器，当它们的值改变时，更新血量和攻击力的标签和矩形条，播放英雄的动画，如果血量为0，结束游戏。

3. **血量和攻击力的获取和设置方法**：`getHP`，`getAC`，`HPProperty`，`ACProperty`，`setHP` 和 `setAC` 方法用于获取和设置玩家的血量和攻击力。

这个类的核心算法主要在构造函数中。构造函数负责初始化玩家面板的样式和功能，包括血量和攻击力的标签和矩形条，以及它们的监听器。监听器负责响应血量和攻击力的改变，更新标签和矩形条，播放英雄的动画，结束游戏。

### 移植架构建议

    src/
        assets/  // 存放游戏资源，如图片
            images/
                animal/
                emoji/
                final/
        components/  // 存放游戏组件
            Jewel.ts  // 宝石类
            Grid.ts  // 网格类
            Player.ts  // 玩家类
            GamePanel.ts  // 游戏面板类
        utils/  // 存放工具函数
            GameInterpolators.ts  // 游戏插值器
            Images.ts  // 图片处理
        styles/  // 存放样式文件
            game.css
        index.ts  // 游戏入口文件
    test/  // 存放测试文件
        Jewel.test.ts
        Grid.test.ts
        Player.test.ts
        GamePanel.test.ts
    package.json  // npm 包管理文件
    tsconfig.json  // TypeScript 配置文件
    README.md  // 项目说明文件