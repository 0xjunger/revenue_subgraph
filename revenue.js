function calculateTransactionMetrics(blocks) {
  const results = [];

  blocks.forEach(block => {
    const baseFee = BigInt(block.baseFeePerGas);

    block.transactions.forEach(tx => {
      const gasPrice = BigInt(tx.gasPrice);
      const gasUsed = BigInt(tx.gasUsed);
      const effectiveGasPrice = BigInt(tx.effectiveGasPrice);

      // (gasPrice - baseFee) * gasUsed
      const metric = (effectiveGasPrice - baseFee) * gasUsed;

      results.push({
        blockNumber: block.number,
        transactionHash: tx.hash,
        metric: metric.toString(),
      });
    });
  });

  return results;
}

// Kullanım örneği:
// const blockData = /* GraphQL sorgusundan gelen veri */;
// const metrics = calculateTransactionMetrics(blockData.blocks);
// console.log(metrics);
