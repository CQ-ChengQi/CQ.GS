using Blazor.Diagrams.Core.Geometry;
using Blazor.Diagrams.Core.Models;

namespace CQ.GS.Client.Models.Diagrams;

public class TwoNumbersNode : NodeModel
{
    public TwoNumbersNode(Point? position = null)
        : base(position) { }

    public double FirstNumber { get; set; }
    public double SecondNumber { get; set; }
}

