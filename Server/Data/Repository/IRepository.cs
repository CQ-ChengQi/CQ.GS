namespace CQ.GS.Server.Data.Repository
{
    public interface IRepository<T>
    {
        /// <summary>
        /// 获取 实体集合 。
        /// </summary>
        public T Entities { get; }

       
    }
}
