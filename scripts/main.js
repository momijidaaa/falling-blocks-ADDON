import { world, system } from "@minecraft/server";

const ALL_BLOCKS = [
  "minecraft:stone",
  "minecraft:granite",
  "minecraft:diorite",
  "minecraft:andesite",
  "minecraft:dirt",
  "minecraft:coarse_dirt",
  "minecraft:grass_block",
  "minecraft:grass",
  "minecraft:seagrass",
  "minecraft:tall_seagrass",
  "minecraft:sand",
  "minecraft:red_sand",
  "minecraft:gravel",
  "minecraft:clay",
  "minecraft:mud",
  "minecraft:oak_log",
  "minecraft:spruce_log",
  "minecraft:birch_log",
  "minecraft:jungle_log",
  "minecraft:acacia_log",
  "minecraft:dark_oak_log",
  "minecraft:mangrove_log",
  "minecraft:cherry_log",
  "minecraft:oak_wood",
  "minecraft:spruce_wood",
  "minecraft:birch_wood",
  "minecraft:jungle_wood",
  "minecraft:acacia_wood",
  "minecraft:dark_oak_wood",
  "minecraft:mangrove_wood",
  "minecraft:cherry_wood",
  "minecraft:oak_planks",
  "minecraft:spruce_planks",
  "minecraft:birch_planks",
  "minecraft:jungle_planks",
  "minecraft:acacia_planks",
  "minecraft:dark_oak_planks",
  "minecraft:mangrove_planks",
  "minecraft:cherry_planks",
  "minecraft:oak_stairs",
  "minecraft:spruce_stairs",
  "minecraft:birch_stairs",
  "minecraft:jungle_stairs",
  "minecraft:acacia_stairs",
  "minecraft:dark_oak_stairs",
  "minecraft:mangrove_stairs",
  "minecraft:cherry_stairs",
  "minecraft:stone_stairs",
  "minecraft:cobblestone_stairs",
  "minecraft:brick_stairs",
  "minecraft:sandstone_stairs",
  "minecraft:oak_slab",
  "minecraft:spruce_slab",
  "minecraft:birch_slab",
  "minecraft:jungle_slab",
  "minecraft:acacia_slab",
  "minecraft:dark_oak_slab",
  "minecraft:mangrove_slab",
  "minecraft:cherry_slab",
  "minecraft:stone_slab",
  "minecraft:cobblestone_slab",
  "minecraft:brick_slab",
  "minecraft:sandstone_slab",
  "minecraft:iron_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:gold_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:diamond_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:emerald_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:lapis_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:redstone_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:copper_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:coal_ore",
  "minecraft:deepslate_coal_ore",
  "minecraft:nether_gold_ore",
  "minecraft:gilded_blackstone",
  "minecraft:iron_block",
  "minecraft:gold_block",
  "minecraft:diamond_block",
  "minecraft:emerald_block",
  "minecraft:lapis_block",
  "minecraft:redstone_block",
  "minecraft:copper_block",
  "minecraft:coal_block",
  "minecraft:quartz_block",
  "minecraft:raw_iron_block",
  "minecraft:raw_gold_block",
  "minecraft:raw_copper_block",
  "minecraft:cobblestone",
  "minecraft:mossy_cobblestone",
  "minecraft:stone_bricks",
  "minecraft:mossy_stone_bricks",
  "minecraft:cracked_stone_bricks",
  "minecraft:chiseled_stone_bricks",
  "minecraft:deepslate",
  "minecraft:deepslate_bricks",
  "minecraft:deepslate_tiles",
  "minecraft:cracked_deepslate_bricks",
  "minecraft:cracked_deepslate_tiles",
  "minecraft:polished_deepslate",
  "minecraft:sandstone",
  "minecraft:red_sandstone",
  "minecraft:bricks",
  "minecraft:mud_bricks",
  "minecraft:white_concrete",
  "minecraft:orange_concrete",
  "minecraft:magenta_concrete",
  "minecraft:light_blue_concrete",
  "minecraft:yellow_concrete",
  "minecraft:lime_concrete",
  "minecraft:pink_concrete",
  "minecraft:gray_concrete",
  "minecraft:light_gray_concrete",
  "minecraft:cyan_concrete",
  "minecraft:purple_concrete",
  "minecraft:blue_concrete",
  "minecraft:brown_concrete",
  "minecraft:green_concrete",
  "minecraft:red_concrete",
  "minecraft:black_concrete",
  "minecraft:white_wool",
  "minecraft:orange_wool",
  "minecraft:magenta_wool",
  "minecraft:light_blue_wool",
  "minecraft:yellow_wool",
  "minecraft:lime_wool",
  "minecraft:pink_wool",
  "minecraft:gray_wool",
  "minecraft:light_gray_wool",
  "minecraft:cyan_wool",
  "minecraft:purple_wool",
  "minecraft:blue_wool",
  "minecraft:brown_wool",
  "minecraft:green_wool",
  "minecraft:red_wool",
  "minecraft:black_wool",
  "minecraft:glass",
  "minecraft:obsidian",
  "minecraft:crying_obsidian",
  "minecraft:netherite_block",
  "minecraft:ancient_debris",
  "minecraft:bedrock",
  "minecraft:end_stone",
  "minecraft:purpur_block",
  "minecraft:netherrack",
  "minecraft:nether_bricks",
  "minecraft:crimson_planks",
  "minecraft:warped_planks",
  "minecraft:basalt",
  "minecraft:blackstone",
  "minecraft:amethyst_block",
  "minecraft:sculk",
  "minecraft:sculk_vein",
  "minecraft:glowstone",
  "minecraft:prismarine",
  "minecraft:sea_lantern",
  "minecraft:sponge",
  "minecraft:tnt"
];

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    spawnRandomBlock(player);
  }
}, 1);

function spawnRandomBlock(player) {
  try {
    const dimension = player.dimension;
    const playerPos = player.location;

    const randomX = playerPos.x + (Math.random() - 0.5) * 64;
    const randomZ = playerPos.z + (Math.random() - 0.5) * 64;
    const randomY = playerPos.y + 35;

    const spawnPos = { x: Math.floor(randomX), y: Math.floor(randomY), z: Math.floor(randomZ) };
    const block = dimension.getBlock(spawnPos);
    
    if (block && block.typeId === "minecraft:air") {
      const randomBlock = ALL_BLOCKS[Math.floor(Math.random() * ALL_BLOCKS.length)];
      
      const fallingEntity = dimension.spawnEntity("minecraft:falling_block", {
        x: spawnPos.x + 0.5,
        y: spawnPos.y,
        z: spawnPos.z + 0.5
      });

      if (fallingEntity) {
        const blockComp = fallingEntity.getComponent("minecraft:falling_block");
        if (blockComp) {
          blockComp.blockTypeId = randomBlock;
        }
      }
    }
  } catch (error) {
    console.warn(`ブロック生成エラー: ${error.message}`);
  }
}
