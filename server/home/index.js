const func = (req, res) => {
	res.json({
		banerList: [
			'http://img.alicdn.com/imgextra/i3/115/O1CN01PsvX9s1Cii2Pvi3WM_!!115-0-luban.jpg',
			'https://gw.alicdn.com/imgextra/i3/43/O1CN01ZPUEId1CBjWPLKzea_!!43-0-lubanu.jpg',
			'https://gw.alicdn.com/imgextra/i2/41/O1CN01yCNeuw1CAojHBeUyC_!!41-0-lubanu.jpg',
			'http://img.alicdn.com/imgextra/i3/115/O1CN01PsvX9s1Cii2Pvi3WM_!!115-0-luban.jpg',
			'https://gw.alicdn.com/imgextra/i3/43/O1CN01ZPUEId1CBjWPLKzea_!!43-0-lubanu.jpg',
			'https://gw.alicdn.com/imgextra/i2/41/O1CN01yCNeuw1CAojHBeUyC_!!41-0-lubanu.jpg'
		],
		cateGoryList: [
			{ name: '锅具', icon: 'https://yanxuan.nosdn.127.net/10a143a382aaf8b8de1f533a1d3b6760.png' },
			{ name: '清洁保鲜', icon: 'https://yanxuan.nosdn.127.net/fdec112d77ab0c5083e6b2c53531df7d.png' },
			{ name: '厨房配件', icon: 'https://yanxuan.nosdn.127.net/a2e37687f68cf5cf9b5f5a54803e6171.png' },
			{ name: '刀剪砧板', icon: 'https://yanxuan.nosdn.127.net/2783b73b3631d9c71a3c602000e393c8.png' },
			{ name: '餐具', icon: 'https://yanxuan.nosdn.127.net/9fec1d39f6753fbc727b1ff76d9c810c.png' },
			{ name: '水具杯壶', icon: 'https://yanxuan.nosdn.127.net/95237ea2c4867a7b6d21e69245316af1.png' },
			{ name: '咖啡具酒具', icon: 'https://yanxuan.nosdn.127.net/318f9ae4afc1aff32515de0f73e66f80.png' },
			{ name: '咖啡具酒具', icon: 'https://yanxuan.nosdn.127.net/318f9ae4afc1aff32515de0f73e66f80.png' }
		],
		brandList: [
			{ name: '冲调饮品', icon: 'https://yanxuan.nosdn.127.net/3d70af62c5461e795644b12721508372.png' },
			{ name: '茶包花茶', icon: 'https://yanxuan.nosdn.127.net/fb30ea6fc9e87d768200c70511a14b08.png' },
			{ name: '传统茗茶', icon: 'https://yanxuan.nosdn.127.net/34dc2c9d61f0df6d472820ac28940ce3.png' },
			{ name: '方便食品', icon: 'https://yanxuan.nosdn.127.net/559b5d22eb9d4164d7b613f6a8d22836.png' },
			{ name: '饼干糕点', icon: 'https://yanxuan.nosdn.127.net/f8d152f1f6f4b0072dcbf10dc2983fe6.png' },
			{ name: '小食糖巧', icon: 'https://yanxuan.nosdn.127.net/63e96c2a27d6a4d67e8feeaaa5ba9c7e.png' },
			{ name: '坚果炒货', icon: 'https://yanxuan.nosdn.127.net/1d0d218887aa43ea3d74a4dcb8965d2d.png' },
			{ name: '肉类零食', icon: 'https://yanxuan.nosdn.127.net/b7f1f3360d22c5a0c9feed8cbe17885c.png' },
			{ name: '蜜饯果干', icon: 'https://yanxuan.nosdn.127.net/2be45b99b4409c4149412a74f2eaf387.png' },
			{ name: '米面粮油', icon: 'https://yanxuan.nosdn.127.net/51b86357c5e34b77e3bb866b1cff15dc.png' },
			{ name: '南北干货', icon: 'https://yanxuan.nosdn.127.net/bbb7bf16b78265062dad3be66724f779.png' },
			{ name: '调味酱菜', icon: 'https://yanxuan.nosdn.127.net/84ca992ed0f3b733b1d71499a14532bb.png' },
			{ name: '酒类', icon: 'https://yanxuan.nosdn.127.net/3698a22b151359f4c1c55f565909fef8.png' },
			{ name: '乳品饮料', icon: 'https://yanxuan.nosdn.127.net/9b04ab23f967ef43d08bef7220452ff4.png' },
			{ name: '果鲜肉蛋', icon: 'https://yanxuan.nosdn.127.net/bbb5ae00927c496676dc1747989b91b7.png' },
			{ name: '网易黑猪', icon: 'https://yanxuan.nosdn.127.net/fc7770efb186d8b440e6f8b07dc0446b.png' },
			{ name: '海外美食', icon: 'https://yanxuan.nosdn.127.net/fe74ff4076d40d2c068d18feb6831a38.png' },
			{ name: '饼干糕点', icon: 'https://yanxuan.nosdn.127.net/f8d152f1f6f4b0072dcbf10dc2983fe6.png' },
			{ name: '小食糖巧', icon: 'https://yanxuan.nosdn.127.net/63e96c2a27d6a4d67e8feeaaa5ba9c7e.png' },
			{ name: '坚果炒货', icon: 'https://yanxuan.nosdn.127.net/1d0d218887aa43ea3d74a4dcb8965d2d.png' },
			{ name: '肉类零食', icon: 'https://yanxuan.nosdn.127.net/b7f1f3360d22c5a0c9feed8cbe17885c.png' },
			{ name: '蜜饯果干', icon: 'https://yanxuan.nosdn.127.net/2be45b99b4409c4149412a74f2eaf387.png' },
			{ name: '冲调饮品', icon: 'https://yanxuan.nosdn.127.net/3d70af62c5461e795644b12721508372.png' },
			{ name: '茶包花茶', icon: 'https://yanxuan.nosdn.127.net/fb30ea6fc9e87d768200c70511a14b08.png' },
			{ name: '传统茗茶', icon: 'https://yanxuan.nosdn.127.net/34dc2c9d61f0df6d472820ac28940ce3.png' },
			{ name: '方便食品', icon: 'https://yanxuan.nosdn.127.net/559b5d22eb9d4164d7b613f6a8d22836.png' },
			{ name: '米面粮油', icon: 'https://yanxuan.nosdn.127.net/51b86357c5e34b77e3bb866b1cff15dc.png' },
			{ name: '南北干货', icon: 'https://yanxuan.nosdn.127.net/bbb7bf16b78265062dad3be66724f779.png' },
			{ name: '调味酱菜', icon: 'https://yanxuan.nosdn.127.net/84ca992ed0f3b733b1d71499a14532bb.png' },
			{ name: '酒类', icon: 'https://yanxuan.nosdn.127.net/3698a22b151359f4c1c55f565909fef8.png' },
			{ name: '乳品饮料', icon: 'https://yanxuan.nosdn.127.net/9b04ab23f967ef43d08bef7220452ff4.png' },
			{ name: '果鲜肉蛋', icon: 'https://yanxuan.nosdn.127.net/bbb5ae00927c496676dc1747989b91b7.png' },
			{ name: '网易黑猪', icon: 'https://yanxuan.nosdn.127.net/fc7770efb186d8b440e6f8b07dc0446b.png' },
			{ name: '海外美食', icon: 'https://yanxuan.nosdn.127.net/fe74ff4076d40d2c068d18feb6831a38.png' }
		],
		hotList: [
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '水洗棉_床单',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/65a7ae2867d891a241dd8291a9037c84.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/cc507ff0ce7cafc1012885a01fb1942a.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/4628932649a190c464d138c9236591fa.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/09f2f2e348111984dd2c65dd8bcbf5d8.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/0001332cb0db9939076f56c1dddbad26.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/0001332cb0db9939076f56c1dddbad26.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			}
		]
	})
}
module.exports = func
